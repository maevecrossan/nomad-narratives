from rest_framework import generics, permissions
from .models import Like
from nomadnarrativesapi.permissions import IsOwnerOrReadOnly
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
