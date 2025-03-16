'''
Root Route View

This module defines the root route for the Django REST framework API.
It provides a simple welcome message when accessed.
'''
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .settings import (
    JWT_AUTH_COOKIE, JWT_AUTH_REFRESH_COOKIE, JWT_AUTH_SAMESITE,
    JWT_AUTH_SECURE,
)
from cities_light.models import Country, City
from utils.continents import fetch_and_add_cities_for_country


@api_view()
def root_route(request):
    return Response({"message": "Welcome to my django rest framework API!"})


# dj-rest-auth logout view fix
@api_view(['POST'])
def logout_route(request):
    response = Response()
    response.set_cookie(
        key=JWT_AUTH_COOKIE,
        value='',
        httponly=True,
        expires='Thu, 01 Jan 1970 00:00:00 GMT',
        max_age=0,
        samesite=JWT_AUTH_SAMESITE,
        secure=JWT_AUTH_SECURE,
    )
    response.set_cookie(
        key=JWT_AUTH_REFRESH_COOKIE,
        value='',
        httponly=True,
        expires='Thu, 01 Jan 1970 00:00:00 GMT',
        max_age=0,
        samesite=JWT_AUTH_SAMESITE,
        secure=JWT_AUTH_SECURE,
    )
    return response


@api_view(['GET'])
def get_all_countries(request):
    '''
    Returns a list of all countries.
    '''
    countries = Country.objects.all()
    country_list = [
        {"id": country.id, "name": country.name} for country in countries
        ]
    return Response({"countries": country_list})


@api_view(['GET'])
def cities_by_country(request, country_id):
    '''
    Returns a list of cities for the given country.
    If no cities are found, it fetches and adds them to the database.
    '''
    country = get_object_or_404(Country, id=country_id)
    cities = City.objects.filter(country=country)

    city_list = [{"id": city.id, "name": city.name} for city in cities]

    return Response({"cities": city_list})
