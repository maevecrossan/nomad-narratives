from django.db.models import Count
from rest_framework import generics, permissions, filters
from django.shortcuts import get_object_or_404
from nomadnarrativesapi.permissions import IsOwnerOrReadOnly
from .models import TripPost
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
        filters.SearchFilter
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

    def perform_create(self, serializer):
        country_id = self.request.data.get('country')
        city_id = self.request.data.get('city')

        country = get_object_or_404(Country, id=country_id)
        city = get_object_or_404(City, id=city_id, country=country)

        post = serializer.save(owner=self.request.user)
        post.details.country = country
        post.details.city = city
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
