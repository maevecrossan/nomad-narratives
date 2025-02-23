from django.db import IntegrityError
from rest_framework import serializers
from .models import Follower


class FollowerSerializer(serializers.ModelSerializer):
    '''
    Serializer for Followers model.
    '''
    owner = serializers.ReadOnlyField(source='owner.username')
    followed = serializers.ReadOnlyField(source='followed.username')

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