'''
Profiles Serializer
'''

from rest_framework import serializers
from .models import Profile
from followers.models import Follower


class ProfileSerializer(serializers.ModelSerializer):
    '''
    Serializer for Profile model.
    '''
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    following_id = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        '''
        Checks if requester is also owner.
        '''
        request = self.context['request']
        return request.user == obj.owner

    def get_following_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            following = Follower.objects.filter(
                owner=user, followed=obj.owner
            ).first()
            # print(following)
            return following.id if following else None
        return None

    class Meta:
        '''
        Specifying what fields to include in the response.
        '''
        model = Profile
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name', 'content',
            'image', 'is_owner', 'following_id'
        ]
