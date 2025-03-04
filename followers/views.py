'''
Contains API views for managing follower relationships between users.

- `FollowerList`: Lists all followers and allows authenticated users to create
  new follow relationships, automatically assigning the authenticated user as
  the owner. Non-authenticated users have read-only access.

- `FollowerDetail`: Retrieves or deletes a specific follower relationship.
  Allows users to follow or unfollow another user, with access control ensuring
  users can only modify their own follow relationships.
'''

from rest_framework import generics, permissions
from nomadnarrativesapi.permissions import IsOwnerOrReadOnly
from .models import Follower
from .serializers import FollowerSerializer


class FollowerList(generics.ListCreateAPIView):
    '''
    API view to list all followers or create a new follower relationship.

    Allows authenticated users to create a new follow relationship,
    automatically setting the authenticated user as the owner of the follow.
    Read-only access is available to non-authenticated users.
    '''
    serializer_class = FollowerSerializer
    queryset = Follower.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FollowerDetail(generics.RetrieveDestroyAPIView):
    '''
    Retrieves a follower.
    Allows users to follow or unfollow another user.
    '''
    serializer_class = FollowerSerializer
    queryset = Follower.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
