'''
Serializer for the Profile model and related fields.

- `ProfileSerializer`: Serializes Profile model data, including user profile
    details and dynamic fields like follow status, post counts, and
    follower counts.
'''
from rest_framework import serializers
from followers.models import Follower
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    '''
    Serializer for Profile model.
    '''
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    following_id = serializers.SerializerMethodField()
    posts_count = serializers.ReadOnlyField()
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()

    def get_is_owner(self, obj):
        '''
        Checks if requester is also owner.
        '''
        request = self.context['request']
        return request.user == obj.owner

    def get_following_id(self, obj):
        '''
        Retrieves the ID of the following relationship between the
        requester (authenticated user) and the profile's owner.

        If the requester is following the profile's owner, the ID of the
        corresponding Follower object is returned. Otherwise, None
        is returned.

        '''
        user = self.context['request'].user
        if user.is_authenticated:
            following = Follower.objects.filter(  # pylint: disable=no-member
                owner=user, followed=obj.owner
            ).first()
            return following.id if following else None
        return None

    class Meta:
        '''
        Specifying what fields to include in the response.
        '''
        model = Profile
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name', 'content',
            'image', 'is_owner', 'following_id', 'posts_count',
            'followers_count', 'following_count'
        ]
