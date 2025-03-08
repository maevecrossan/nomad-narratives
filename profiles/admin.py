'''
Django admin configuration for the Profile model.
'''
from django.contrib import admin
from .models import Profile

admin.site.register(Profile)
