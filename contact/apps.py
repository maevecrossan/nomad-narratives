'''
App configuration for the Contact application.
'''

from django.apps import AppConfig


class ContactConfig(AppConfig):
    '''
    Configuration class for the Contact app.
    Sets the default auto field type and specifies the app's name.
    '''
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'contact'
