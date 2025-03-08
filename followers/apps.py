'''
App configuration for the Followers application.

This module defines the configuration settings for the Followers app
within the Django project.
'''
from django.apps import AppConfig


class FollowersConfig(AppConfig):
    '''
    Configuration class for the Followers app.

    This class sets the default primary key type and specifies the app name.
    '''
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'followers'
