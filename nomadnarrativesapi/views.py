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
from rest_framework import viewsets, permissions, status
from rest_framework.pagination import PageNumberPagination
from cities_light.models import Country, City
from .serializers import CountrySerializer, CitySerializer
from rest_framework.decorators import action


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


class CountryPagination(PageNumberPagination):
    page_size = 500


class CountryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    pagination_class = CountryPagination


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [permissions.IsAuthenticated]

    # This custom action allows filtering cities by country
    @action(detail=False, methods=['get'], url_path='by-country')
    def get_cities_by_country(self, request):
        country_id = request.query_params.get('country', None)
        if country_id:
            cities = City.objects.filter(country_id=country_id)
            serializer = self.get_serializer(cities, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "Country ID is required."},
                status=status.HTTP_400_BAD_REQUEST
                )
