'''
Admin configuration for the Contact model.
'''
from django.contrib import admin
from .models import Contact


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    '''
    Admin interface for managing Contact model entries.

    - Displays sender name, email, and creation date in the admin list view.
    '''
    list_display = ('sender_name', 'email', 'created_at')
    search_fields = ('sender_name', 'last_name', 'email')
