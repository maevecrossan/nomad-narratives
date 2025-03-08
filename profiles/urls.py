'''
Defines URL routes for accessing and interacting with user profiles.

- `ProfileList`: View for listing all profiles and creating new profiles.
- `ProfileDetail`: View for retrieving, updating, and
   deleting a specific profile.

URLs:
- `/profiles/`: List all profiles or create a new one.
- `/profiles/<int:pk>/`: Retrieve, update, or delete a profile by
   its primary key.
'''

from django.urls import path
from profiles import views

urlpatterns = [
    path('profiles/', views.ProfileList.as_view()),
    path('profiles/<int:pk>/', views.ProfileDetail.as_view()),
]
