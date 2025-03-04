'''
Profile Views for handling profile-related API endpoints.

Includes views for retrieving, listing, and updating user profiles. It also
handles custom filtering and ordering options for profiles based on
various metrics.
'''

from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from nomadnarrativesapi.permissions import IsOwnerOrReadOnly
from .models import Profile
from .serializers import ProfileSerializer


class ProfileList(generics.ListAPIView):
    '''
    Returns a list of all profiles.
    No Create view (profile creation handled by Django signals).
    '''
    queryset = Profile.objects.annotate(
        posts_count=Count('owner__trippost', distinct=True),
        followers_count=Count('owner__followed', distinct=True),
        following_count=Count('owner__following', distinct=True)
    ).order_by('-created_at')
    serializer_class = ProfileSerializer

    filter_backends = [
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]

    ordering_fields = [
        'posts_count',
        'followers_count',
        'following_count',
        'owner__following__created_at',
        'owner__followed__created_at',
    ]

    filterset_fields = [
        'owner__following__followed__profile',
        'owner__followed__owner__profile',
    ]


class ProfileDetail(generics.RetrieveUpdateAPIView):
    '''
    Allows profile retrieval and updating.
    '''
    serializer_class = ProfileSerializer
    queryset = Profile.objects.annotate(
        posts_count=Count(
            'owner__trippost',
            distinct=True),
        followers_count=Count(
            'owner__followed',
            distinct=True),
        following_count=Count(
            'owner__following',
            distinct=True)
    ).order_by('-created_at')
    permission_classes = [IsOwnerOrReadOnly]
