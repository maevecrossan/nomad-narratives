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
        country_id = self.request.data.get('country')
        country = get_object_or_404(Country, id=country_id)

        city_ids = self.request.data.get("details", {}).get("cities", [])
        if not isinstance(city_ids, list):
            return Response(
                {"error": "Invalid city data format"},
                status=status.HTTP_400_BAD_REQUEST)

        cities = City.objects.filter(id__in=city_ids)

        if cities.count() != len(city_ids):
            return Response(
                {"error": "Some cities were not found."},
                status=status.HTTP_400_BAD_REQUEST)

        post = serializer.save(owner=self.request.user)

        trip_details = TripDetails.objects.create(
            trip_post=post,
            country=country,
        )

        if cities.exists():
            trip_details.city = cities.first()  # Assign the first city for now

        # Set continent
        trip_details.continent = get_continent_by_country(country.name)
        trip_details.save()


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
