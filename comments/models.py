'''
Represents a comment made by a user on a specific trip post.
'''

from django.db import models
from django.contrib.auth.models import User
from posts.models import TripPost


class Comment(models.Model):
    '''
    Comment model, related to User and Post.

    '''
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(TripPost, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()

    class Meta:
        '''
        Orders comments by creation time in descending order.
        '''
        ordering = ['-created_at']

    def __str__(self):
        '''
        Returns a string representation of the comment's content.
        '''
        return str(self.content)
