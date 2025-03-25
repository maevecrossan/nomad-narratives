from django.urls import path
from contact import views

urlpatterns = [
    path('contact/', views.ContactCreateView.as_view(), name='contact-create'),
]
