from django.http import Http404
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from nomadnarrativesapi.permissions import IsOwnerOrReadOnly
from .models import TripPost
from .serializers import TripPostSerializer
from cities_light.models import Country, City
from .serializers import CitySerializer


class CountryCitiesView(APIView):
    '''
    Narrows down available cities depending on chosen country.
    '''
    def get(self, request, country_id):
        try:
            country = Country.objects.get(id=country_id)
            cities = City.objects.filter(country=country)
            serializer = CitySerializer(cities, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Country.DoesNotExist:
            return Response(
                {"detail": "Country not found."},
                status=status.HTTP_404_NOT_FOUND
            )


class TripPostCreateView(APIView):
    def post(self, request, *args, **kwargs):
        """
        Handles creation of a TripPost,
        including the city based on selected country.
        """
        country_id = request.data.get('country')
        city_id = request.data.get('city')
        # Singular city ID instead of cities array

        # Ensure the selected country exists
        country = get_object_or_404(Country, id=country_id)

        # Ensure the selected city exists in the selected country
        city = get_object_or_404(City, id=city_id, country=country)

        # Create the TripPost instance
        serializer = TripPostSerializer(data=request.data)

        if serializer.is_valid():
            trip_post = serializer.save(owner=request.user)

            # Create the TripDetails and link the city
            trip_details = trip_post.details
            trip_details.country = country
            trip_details.city = city  # Assign the single city
            trip_details.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostList(APIView):
    '''
    Handles Post logic.
    '''
    serializer_class = TripPostSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def get(self, request):
        '''
        GETs all posts.
        '''
        posts = TripPost.objects.all()
        serializer = TripPostSerializer(
            posts, many=True, context={'request': request}
        )
        return Response(serializer.data)

    def post(self, request):
        '''
        Post creating logic
        '''
        serializer = TripPostSerializer(
            data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(
                serializer.data, status=status.HTTP_201_CREATED
                )
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )


class PostDetail(APIView):
    '''
    Post detail view.
    Allows updating post.
    '''
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = TripPostSerializer

    def get_object(self, pk):
        '''
        Checks if post exists.
        '''
        try:
            post = TripPost.objects.get(pk=pk)
            self.check_object_permissions(self.request, post)
            return post
        except TripPost.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        '''
        Return post if post exists.
        '''
        post = self.get_object(pk)
        serializer = TripPostSerializer(
            post, context={'request': request}
        )
        return Response(serializer.data)

    def put(self, request, pk):
        '''
        Allow editing of post content.
        '''
        post = self.get_object(pk)
        serializer = TripPostSerializer(
            post, data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        '''
        Allow post deletion.
        '''
        post = self.get_object(pk)
        post.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT
        )
