from django.db import models
from django.contrib.auth.models import User
from posts.models import TripPost


class Like(models.Model):
    '''
    Like model, related to User and Post
    '''
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(
        TripPost,
        on_delete=models.CASCADE,
        related_name='likes'
        )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'post']

    def __str__(self):
        return f'{self.owner} {self.post}'
