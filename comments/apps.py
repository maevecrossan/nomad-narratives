'''
App configuration for the Comments application.

This module defines the configuration settings for the Comments app
within the Django project.
'''
from django.apps import AppConfig


class CommentsConfig(AppConfig):
    '''
    This class sets the default primary key type and specifies the app name.
    '''
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'comments'
