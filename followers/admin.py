'''
Django admin configuration for the Follower model.
'''
from django.contrib import admin
from .models import Follower

admin.site.register(Follower)
