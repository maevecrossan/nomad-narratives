'''
Profile Views
'''

from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer
from nomadnarrativesapi.permissions import IsOwnerOrReadOnly

class ProfileList(APIView):
    '''
    Returns a list of all profiles.
    No Create view (profile creation handled by Django signals).
    '''
    def get(self, request):
        '''
        Retrieves all profiles and returns them in a response.
        '''
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(
            profiles, many=True, context={'request': request}
            )
        return Response(serializer.data)


class ProfileDetail(APIView):
    '''
    Allows profile retrieval and updating.
    '''
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self, pk):
        '''
        Retrieves profiles.
        '''
        try:
            profile = Profile.objects.get(pk=pk)
            self.check_object_permissions(self.request, profile)
            return profile
        except Profile.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        '''
        Retrieves profile based on ID.
        '''
        profile = self.get_object(pk)
        serializer = ProfileSerializer(
            profile, context={'request': request}
            )
        return Response(serializer.data)

    def put(self, request, pk):
        '''
        Updates retrieved profile based on ID.
        '''
        profile = self.get_object(pk)
        serializer = ProfileSerializer(
            profile, data=request.data, context={'request': request}
            )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
