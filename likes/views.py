'''
Contains API views for managing "like" relationships between users and posts.

- `LikeList`: Lists all likes and allows authenticated users to create
  a new like for a post. Non-authenticated users have read-only access.

- `LikeDetail`: Retrieves or deletes a specific like. Only the owner of the
  like can modify or remove it.
'''
from rest_framework import generics, permissions
from nomadnarrativesapi.permissions import IsOwnerOrReadOnly
from .models import Like
from .serializers import LikeSerializer


class LikeList(generics.ListCreateAPIView):
    '''
    Lists all likes.
    Creates a like if user is authenticated.
    The perform_create method links the like with the logged in user.
    '''

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = LikeSerializer
    queryset = Like.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LikeDetail(generics.RetrieveDestroyAPIView):
    '''
    Retrieves a like.
    Users only like or unlike a post if they own the like.
    '''
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
