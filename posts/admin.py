from django.contrib import admin
from cities_light.models import City


class CityAdmin(admin.ModelAdmin):
    '''
    Cleans up admin panel to remove unnecessary additonal fields.
    '''
    list_display = ['name']  # Only display the city name
    search_fields = ['name']


admin.site.unregister(City)
admin.site.register(City, CityAdmin)
