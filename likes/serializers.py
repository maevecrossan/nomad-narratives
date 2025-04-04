'''
Contains the serializer for the `Like` model, which handles the creation
and serialization of "like" relationships between users and posts.
Includes error handling for duplicate likes.
'''
from django.db import IntegrityError
from rest_framework import serializers
from .models import Like


class LikeSerializer(serializers.ModelSerializer):
    '''
    Serializer for Like model.
    '''
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        '''
        Specifies what fields to be returned.
        '''
        model = Like
        fields = ['id', 'created_at', 'owner', 'post']

    def create(self, validated_data):
        '''
        Duplicate like error handler
        '''
        try:
            return super().create(validated_data)
        except IntegrityError as exc:
            raise serializers.ValidationError(
                {'detail': 'possible duplicate'}) from exc
