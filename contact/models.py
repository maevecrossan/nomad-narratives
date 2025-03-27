'''
Defines the Contact model for storing user-submitted contact form data.
'''
from django.db import models


class Contact(models.Model):
    '''
    Fields for form to contact admin.
    '''
    sender_name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender_name}"
