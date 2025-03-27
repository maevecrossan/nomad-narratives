'''
Admin configuration for the TripPost and TripDetails models.
- Manages trip-related data, including inline editing of TripDetails
within TripPost.
'''
from django.contrib import admin
from .models import TripPost, TripDetails


class TripDetailsInline(admin.StackedInline):
    '''
    TripDetails Inline Admin: Allow editing TripDetails
    directly within TripPost.
    '''
    model = TripDetails
    extra = 1  # Number of empty forms to show by default
    fields = (
        'country', 'city', 'traveller_number', 'relevant_for',
        'duration_value', 'duration_unit'
    )  # Fields to display in the inline form

    def get_cities(self, obj):
        """
        Custom method to display a list of cities as a
        comma-separated string.
        """
        return ", ".join([city.name for city in obj.city.all()])
    get_cities.short_description = 'Cities'


@admin.register(TripPost)
class TripPostAdmin(admin.ModelAdmin):
    '''
    Register the TripPost model
    '''
    list_display = ('title', 'owner', 'created_at', 'updated_at')
    search_fields = ('title', 'content')
    inlines = [TripDetailsInline]
