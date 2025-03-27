'''
URL configuration for the Contact app.

Defines the URL pattern for the contact form API endpoint.
'''

from django.urls import path
from contact import views

urlpatterns = [
    path('contact/', views.ContactCreateView.as_view(), name='contact-create'),
]
