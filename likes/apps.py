'''
Configures the "likes" app, defining the default auto field type and app name.
'''
from django.apps import AppConfig


class LikesConfig(AppConfig):
    '''
    Configuration for the "likes" app, specifying the default auto field type
    and the app name.
    '''
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'likes'
