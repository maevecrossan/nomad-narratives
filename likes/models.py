'''
Contains the `Like` model, representing the relationship between users and
posts they have liked. Ensures that a user can like a post only once.
'''
from django.db import models
from django.contrib.auth.models import User
from posts.models import TripPost


class Like(models.Model):
    '''
    Like model, related to Owner and TripPost.
    'unique_together' ensures a user can't like one post twice.
    '''
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(
        TripPost,
        on_delete=models.CASCADE,
        related_name='likes'
        )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        '''
        Represents a like on a post by a user.

        Ensures that each user can like a post only once by enforcing a
        unique constraint between the user and post.
        '''
        ordering = ['-created_at']
        unique_together = ['owner', 'post']

    def __str__(self):
        return f'{self.owner} {self.post}'
