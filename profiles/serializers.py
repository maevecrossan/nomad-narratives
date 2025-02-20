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
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        '''
        Checks if requester is also owner.
        '''
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        '''
        Specifying what fields to include in the response.
        '''
        model = Profile
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name', 'content', 'image',
            'is_owner'
        ]
