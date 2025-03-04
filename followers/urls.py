'''
Defines URL patterns for managing follower relationships, 
including listing followers and viewing details of a specific 
follower relationship.
'''

from django.urls import path
from followers import views

urlpatterns = [
    path('followers/', views.FollowerList.as_view()),
    path('followers/<int:pk>/', views.FollowerDetail.as_view())
]
