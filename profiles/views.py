'''
Profile Views
'''

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer

class ProfileList(APIView):
    '''
    Returns a list of all profiles.
    '''
    def get(self, request):
        '''
        Retrieves all profiles and returns them in a response.
        '''
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)
