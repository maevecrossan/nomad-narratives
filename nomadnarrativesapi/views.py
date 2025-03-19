'''
Root Route View

This module defines the root route for the Django REST framework API.
It provides a simple welcome message when accessed.
'''
# from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .settings import (
    JWT_AUTH_COOKIE, JWT_AUTH_REFRESH_COOKIE, JWT_AUTH_SAMESITE,
    JWT_AUTH_SECURE,
)
from cities_light.models import Country, City
from rest_framework import status


# @api_view()
# def root_route(request):
#     return Response({"message": "Welcome to my django rest framework API!"})


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


# Fetch all countries
@api_view(['GET'])
def get_countries(request):
    """
    This view returns a list of all countries.
    """
    countries = Country.objects.all()
    data = [{'id': country.id, 'name': country.name} for country in countries]
    return Response(data)


# Fetch cities for a selected country
@api_view(['GET'])
def get_cities(request, country_id):
    """
    This view returns cities for a selected country.
    """
    try:
        country = Country.objects.get(id=country_id)
    except Country.DoesNotExist:
        return Response(
            {"error": "Country not found"}, status=status.HTTP_404_NOT_FOUND
            )

    cities = City.objects.filter(country=country)
    data = [{'id': city.id, 'name': city.name} for city in cities]
    return Response(data)
