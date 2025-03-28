'''
Defines the Profile model and its related logic for user profiles.

- `Profile`: Stores user profile information such as name, content (bio),
    and image.
- A new profile is automatically created when a new User instance is created.
'''

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User


class Profile(models.Model):
    '''
    Profile model.
    '''
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255, blank=True)
    content = models.TextField(blank=True)
    image = models.ImageField(
        upload_to='images/', default='../default_profile_cf7kd5'
    )

    class Meta:
        '''
        Returns profile instances in reverse order.
        '''
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner}'s profile"


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    '''
    Creates a new profile every time a user is created.
    '''
    if created:
        Profile.objects.create(owner=instance)  # pylint: disable=no-member


post_save.connect(create_profile, sender=User)
