'''
Defines URL patterns for managing "like" relationships, including listing likes 
and viewing details of a specific like.
'''
from django.urls import path
from likes import views

urlpatterns = [
    path('likes/', views.LikeList.as_view()),
    path('likes/<int:pk>/', views.LikeDetail.as_view()),
]
