'''
Django admin configuration for the City model.
'''
from django.contrib import admin
from .models import Comment

admin.site.register(Comment)
