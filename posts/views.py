from django.db.models import Count
from rest_framework import generics, permissions, filters
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from nomadnarrativesapi.permissions import IsOwnerOrReadOnly
from .models import TripPost
from utils.continents import get_continent_by_country
from .serializers import TripPostSerializer
from cities_light.models import Country, City


class PostList(generics.ListCreateAPIView):
    '''
    Handles Post logic.
    '''
    serializer_class = TripPostSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = TripPost.objects.annotate(
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
        'title',  # TripPost title
        'details__continent',  # from TripDetails
        'details__country__name',  # from TripDetails
        'details__city__name'  # from TripDetails
        ]

    filterset_fields = [
        'owner__profile',
        'owner__followed__owner__profile',
        'likes__owner__profile'
        ]

    def perform_create(self, serializer):
        country_id = self.request.data.get('country')
        city_ids = self.request.data.get('city')

        country = get_object_or_404(Country, id=country_id)
        cities = City.objects.filter(id__in=city_ids)

        post = serializer.save(owner=self.request.user)

        post.details.country = country
        post.details.city.set(cities)
        post.details.continent = get_continent_by_country(country.name)
        post.details.save()


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    '''
    Post detail view.
    Allows updating/deleting of post if owned by requester.
    '''
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = TripPostSerializer
    queryset = TripPost.objects.annotate(
        comments_count=Count(
            'likes',
            distinct=True),
        likes_count=Count(
            'comment',
            distinct=True),
    ).order_by('-created_at')
