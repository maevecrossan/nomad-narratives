'''
URL configuration for the Comments application.

This module defines the URL patterns for the Comments app, mapping
views to specific endpoints for handling comment-related requests.
'''
from django.urls import path
from comments import views

urlpatterns = [
    path('comments/', views.CommentList.as_view()),
    path('comments/<int:pk>/', views.CommentDetail.as_view())
]
