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
from rest_framework import viewsets
from cities_light.models import Country, City
from .serializers import CountrySerializer, CitySerializer


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


class CountryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer

    def get_queryset(self):
        ''''
        Filter cities by country if a query parameter is provided.
        '''
        queryset = City.objects.all()
        country_id = self.request.query_params.get('country_id')
        if country_id:
            queryset = queryset.filter(country_id=country_id)
        return queryset


@api_view(['GET'])
def cities_by_country(request):
    '''
    Returns a list of cities for a given country.
    Example: /api/cities/?country_id=1
    '''
    country_id = request.GET.get('country_id')

    if not country_id:
        return Response({"error": "Missing country_id parameter"}, status=400)

    cities = City.objects.filter(country_id=country_id)
    city_list = [{"id": city.id, "name": city.name} for city in cities]

    return Response({"cities": city_list})
