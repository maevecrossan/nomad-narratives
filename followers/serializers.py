'''
Serializer for the `Follower` model, handling the creation and serialization
of follower relationships between users.

Includes validation for duplicate follow attempts.
'''
from django.db import IntegrityError
from rest_framework import serializers
from .models import Follower


class FollowerSerializer(serializers.ModelSerializer):
    '''
    Serializer for Followers model.

    It handles serialization of the `owner` and `followed`
        user details, as well as managing errors related to duplicate
        follow requests.
    '''
    owner = serializers.ReadOnlyField(source='owner.username')
    followed_name = serializers.ReadOnlyField(source='followed.username')

    class Meta:
        '''
        Specifies what fields to be returned.
        '''
        model = Follower
        fields = ['id', 'owner', 'created_at', 'followed', 'followed_name']

    def create(self, validated_data):
        '''
        Duplicate like error handler
        '''
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({'detail': 'possible duplicate'})
