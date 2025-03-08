'''
Views for the Comments application.

This module defines API views for listing, creating, retrieving, updating,
and deleting comments using Django REST Framework.
'''
from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from nomadnarrativesapi.permissions import IsOwnerOrReadOnly
from .models import Comment
from .serializers import CommentSerializer, CommentDetailSerializer


class CommentList(generics.ListCreateAPIView):
    '''
    List all comments
    Create a new comment if authenticated
    Associate the current logged in user with the comment
    '''

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    filter_backends = [
        DjangoFilterBackend
        ]
    filterset_fields = [
        'post'
        ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a comment
    Allows updating/deletion by owner.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = CommentDetailSerializer
    queryset = Comment.objects.all()
