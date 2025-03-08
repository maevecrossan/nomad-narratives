'''
Django admin configuration for the City model.

This module customizes the admin interface for the City model
from the cities_light app by simplifying the displayed fields
and enhancing search functionality.
'''
from django.contrib import admin
from cities_light.models import City


class CityAdmin(admin.ModelAdmin):
    '''
    Cleans up admin panel to remove unnecessary additonal fields.
    Only displays the city name
    '''
    list_display = ['name']
    search_fields = ['name']


admin.site.unregister(City)
admin.site.register(City, CityAdmin)
