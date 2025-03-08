'''
URL configuration for the posts app.

This module defines the URL patterns for the post-related views, including:

- A list view for all posts (`PostList`).
- A detail view for individual posts (`PostDetail`).
'''
from django.urls import path
from posts import views

urlpatterns = [
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    ]
