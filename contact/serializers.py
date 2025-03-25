from rest_framework import serializers
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    '''
    Serializer for contact model.
    '''
    class Meta:
        model = Contact
        fields = '__all__'
