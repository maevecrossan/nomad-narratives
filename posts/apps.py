'''
App configuration for the Posts application.

This module defines the configuration settings for the Posts app
within the Django project.
'''
from django.apps import AppConfig


class PostsConfig(AppConfig):
    '''
    This class sets the default primary key type and specifies the app name.
    '''
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'posts'
