'''
This management command populates cities for all countries in the database
by fetching city data from the GeoNames API.

It retrieves the list of all countries and for each country, calls the
`populate_cities_for_all_countries` function from the `utils.continents` module
to fetch and add city data for that country.
'''

from django.core.management.base import BaseCommand
from utils.continents import populate_cities_for_all_countries


class Command(BaseCommand):
    '''
    Django management command to populate the database with cities for
    all countries.

    This command interacts with the GeoNames API to fetch and add cities
    to the
    `City` model for every country stored in the `Country` model.
    '''
    help = 'Populates cities for all countries in the database'

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting to populate cities for all countries...")
        populate_cities_for_all_countries()
        self.stdout.write("Finished populating cities.")
