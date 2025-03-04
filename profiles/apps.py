'''
Configures the "profiles" app, specifying the default auto field type
and the app name.
'''
from django.apps import AppConfig


class ProfilesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'profiles'
