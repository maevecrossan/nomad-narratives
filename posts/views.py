from django.db.models import Count
from rest_framework import generics, permissions
from django.shortcuts import get_object_or_404
from nomadnarrativesapi.permissions import IsOwnerOrReadOnly
from .models import TripPost
from .serializers import TripPostSerializer
from cities_light.models import Country, City


class PostList(generics.ListCreateAPIView):
    '''
    Handles Post logic.
    '''
    serializer_class = TripPostSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = TripPost.objects.annotate(
        comments_count=Count(
            'likes',
            distinct=True),
        likes_count=Count(
            'comment',
            distinct=True),
    ).order_by('-created_at')

    def perform_create(self, serializer):
        country_id = self.request.data.get('country')
        city_id = self.request.data.get('city')

        country = get_object_or_404(Country, id=country_id)
        city = get_object_or_404(City, id=city_id, country=country)

        post = serializer.save(owner=self.request.user)
        post.details.country = country
        post.details.city = city
        post.details.save()


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    '''
    Post detail view.
    Allows updating/deleting of post if owned by requester.
    '''
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = TripPostSerializer
    queryset = TripPost.objects.all()
