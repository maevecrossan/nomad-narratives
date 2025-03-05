'''
Root Route View

This module defines the root route for the Django REST framework API.
It provides a simple welcome message when accessed.
'''
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view()
def root_route(request):
    return Response({"message": "Welcome to my django rest framework API!"})
