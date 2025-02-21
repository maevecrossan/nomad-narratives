from rest_framework import generics, permissions
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
