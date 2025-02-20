from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
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
