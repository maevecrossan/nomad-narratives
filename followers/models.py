from django.db import models
from django.contrib.auth.models import User


class Follower(models.Model):
    '''
    Represents a follower relationship between users.

    - 'owner' refers to the user who is following another user.
    - 'followed' refers to the user being followed.
    - The 'related_name' attribute distinguishes the two User instances.
    - The 'unique_together' constraint ensures a user cannot
    follow the same user more than once.
    '''
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='following'
        )
    followed = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='followed'
        )
    created_at = models.DateTimeField(
        auto_now_add=True
        )

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'followed']

    def __str__(self):
        return f'{self.owner} {self.followed}'
