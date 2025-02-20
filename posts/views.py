from django.http import Http404
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from nomadnarrativesapi.permissions import IsOwnerOrReadOnly
from .models import Post
from .serializers import PostSerializer


class PostList(APIView):
    '''
    Handles Post logic.
    '''
    serializer_class = PostSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def get(self, request):
        '''
        GETs all posts.
        '''
        posts = Post.objects.all()
        serializer = PostSerializer(
            posts, many = True, context = {'request': request}
        )
        return Response(serializer.data)

    def post(self, request):
        '''
        Post creating logic
        '''
        serializer = PostSerializer(
            data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(
                serializer.data, status=status.HTTP_201_CREATED
                )
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

class PostDetail(APIView):
    '''
    Post detail view. 
    Allows updating post.
    '''
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = PostSerializer

    def get_object(self, pk):
        '''
        Checks if post exists.
        '''
        try:
            post = Post.objects.get(pk=pk)
            self.check_object_permissions(self.request, post)
            return post
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        '''
        Return post if post exists.
        '''
        post = self.get_object(pk)
        serializer = PostSerializer (
            post, context={'request': request}
        )
        return Response(serializer.data)

    def put(self, request, pk):
        '''
        Allow editing of post content.
        '''
        post = self.get_object(pk)
        serializer = PostSerializer(
            post, data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        '''
        Allow post deletion.
        '''
        post = self.get_object(pk)
        post.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT
        )
