from django.urls import path
from posts import views
from .views import CountryCitiesView

urlpatterns = [
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    path(
        'api/countries/<int:country_id>/cities/',
        CountryCitiesView.as_view(),
        name='country-cities'
        ),
    ]
