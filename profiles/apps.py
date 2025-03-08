'''
Configures the "profiles" app, specifying the default auto field type
and the app name.
'''
from django.apps import AppConfig


class ProfilesConfig(AppConfig):
    '''
    This class specifies the default auto field type for the app
    (BigAutoField) and sets the name of the app to "Profiles".
    '''
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'profiles'
