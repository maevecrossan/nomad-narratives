from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post
from .serializers import PostSerializer

class PostList(APIView):
    '''
    
    '''
    def get(self, request):
        '''
        GETs all posts.
        '''
        posts = Post.objects.all()
        serializer = PostSerializer(
            posts, many = True, context = {'request': request}
        )
        return Response(serializer.data)
