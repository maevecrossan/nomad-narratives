'''
Imports for views related to TripPost.

This module imports various libraries and components used for handling
TripPost views, including Django, REST framework components, and custom
permissions and serializers.
'''
from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, filters, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from nomadnarrativesapi.permissions import IsOwnerOrReadOnly
from utils.continents import get_continent_by_country
from cities_light.models import Country, City
from .serializers import TripPostSerializer
from .models import TripPost, TripDetails


class PostList(generics.ListCreateAPIView):
    '''
    Handles Post logic.
    '''
    serializer_class = TripPostSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = TripPost.objects.annotate(  # pylint: disable=no-member
        comments_count=Count(
            'likes',
            distinct=True),
        likes_count=Count(
            'comment',
            distinct=True),
    ).order_by('-created_at')

    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend
        ]

    ordering_fields = [
        'likes_count',
        'comments_count',
        'likes__created_at'
        ]

    search_fields = [
        'owner__username',
        'title'  # TripPost title
        ]

    filterset_fields = [
        'owner__profile',
        'owner__followed__owner__profile',
        'likes__owner__profile'
        ]

    def perform_create(self, serializer):
        # Get country name from the request
        country_name = self.request.data.get(
            'details', {}).get('country', None
                               )

        if not country_name:
            return Response(
                {"error": "Country is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Retrieve the country object based on its name
        country = get_object_or_404(Country, name=country_name)

        # Get city name from the request
        city_name = self.request.data.get('details', {}).get('city', None)

        if not city_name:
            return Response(
                {"error": "City is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Retrieve the city object based on its name
        city = get_object_or_404(City, name=city_name)

        # Proceed with saving the post
        post = serializer.save(owner=self.request.user)

        # Create TripDetails and associate with the post
        trip_details = TripDetails.objects.create(
            trip_post=post,
            country=country,
            continent=get_continent_by_country(country.name),
            city=city  # Associate the single city
        )

        # Save the trip details
        trip_details.save()

        return post


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    '''
    Post detail view.
    Allows updating/deleting of post if owned by requester.
    '''
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = TripPostSerializer
    queryset = TripPost.objects.annotate(  # pylint: disable=no-member
        comments_count=Count(
            'likes',
            distinct=True),
        likes_count=Count(
            'comment',
            distinct=True),
    ).order_by('-created_at')
