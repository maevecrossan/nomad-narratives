'''
Profiles Serializer
'''

from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    '''
    Serializer for Profile model.
    '''
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        '''
        Specifying what fields to include in the response.
        '''
        model = Profile
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name', 'content', 'image'
        ]
