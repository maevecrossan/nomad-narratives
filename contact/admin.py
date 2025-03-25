from django.contrib import admin
from .models import Contact


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('sender_name', 'email', 'created_at')
    search_fields = ('sender_name', 'last_name', 'email')
