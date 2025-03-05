from rest_framework import serializers
from django.contrib.humanize.templatetags.humanize import naturaltime
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    '''
    Serializer for Comment model.
    '''
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        '''
        Checks for owner of comment.
        '''
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        '''
        Specifies what fields to be returned.
        '''
        model = Comment
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'post', 'created_at',
            'updated_at', 'content']


class CommentDetailSerializer(CommentSerializer):
    '''
    Serializer for the Comment model used in Detail view.
    '''
    post = serializers.ReadOnlyField(source='post.id')
