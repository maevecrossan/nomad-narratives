'''
Defines the ContactCreateView, which provides an API endpoint
for creating Contact model instances.
'''
from rest_framework import generics
from .models import Contact
from .serializers import ContactSerializer


class ContactCreateView(generics.CreateAPIView):
    '''
    View for contact model.
    '''
    queryset = Contact.objects.all()  # pylint: disable=no-member
    serializer_class = ContactSerializer
