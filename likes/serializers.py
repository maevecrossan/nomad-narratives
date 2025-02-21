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