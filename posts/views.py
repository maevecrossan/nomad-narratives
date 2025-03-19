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

    def create(self, request, *args, **kwargs):
        # Ensure the user is logged in
        if not request.user.is_authenticated:
            return Response(
                {"error": "Authentication is required to create a post."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        data = request.data.copy()
        data['owner'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
            )


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
