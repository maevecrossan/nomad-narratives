'''
Serializer for the Contact model.
'''

from rest_framework import serializers
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    '''
    Serializer for contact model.
    '''
    class Meta:
        '''
        Returns all fields.
        '''
        model = Contact
        fields = '__all__'
