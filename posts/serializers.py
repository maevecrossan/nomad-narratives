'''
Posts Serializer
'''
from rest_framework import serializers
from .models import TripPost, TripDetails
from likes.models import Like
from cities_light.models import City


class TripDetailsSerializer(serializers.ModelSerializer):
    '''
    Serializer for TripDetails model.
    '''
    continent = serializers.ReadOnlyField()
    country_name = serializers.ReadOnlyField(source='country.name')
    city = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.none(),
        many=True
        )
    duration_display = serializers.SerializerMethodField()

    def get_duration_display(self, obj):
        '''
        Returns a human-readable string representing the trip's duration.
        '''
        return f"{obj.duration_value} {obj.get_duration_unit_display()}"

    class Meta:
        '''
        Specifies the model and the fields to be included in the
        serialized output.
        '''
        model = TripDetails
        fields = [
            'id', 'country', 'country_name', 'continent',
            'city', 'traveller_number', 'relevant_for',
            'duration_value', 'duration_unit', 'duration_display'
        ]


class TripPostSerializer(serializers.ModelSerializer):
    '''
    Serializer for TripPost model.
    '''
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    details = TripDetailsSerializer()
    like_id = serializers.SerializerMethodField()
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    content = serializers.CharField()

    def validate_image(self, value):
        '''
        Sets parameters for acceptable image sizes.
        '''
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError(
                'Image size larger than 2MB!'
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                'Image width larger than 4096px'
            )
        if value.image.height > 4096:
            raise serializers.ValidationError(
                'Image height larger than 4096px'
            )
        return value

    def get_is_owner(self, obj):
        '''
        Checks for owner.
        '''
        request = self.context['request']
        return request.user == obj.owner

    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(
                owner=user, post=obj
            ).first()
            return like.id if like else None
        return None

    def create(self, validated_data):
        '''
        Handle creation of TripPost and related TripDetails.
        '''
        details_data = validated_data.pop('details')
        city_data = details_data.pop('city', [])

        trip_post = TripPost.objects.create(**validated_data)
        trip_details = TripDetails.objects.create(
            trip_post=trip_post, **details_data
            )

        trip_details.city.set(city_data)  # Assign multiple cities
        trip_details.save()

        return trip_post

    def update(self, instance, validated_data):
        '''
        Handle update of TripPost and related TripDetails.
        '''
        details_data = validated_data.pop('details')

        # Update TripPost fields
        instance = super().update(instance, validated_data)

        # Update the TripDetails fields
        if details_data:
            details_instance = instance.details
            city_data = details_data.pop('city', [])

            for field, value in details_data.items():
                setattr(details_instance, field, value)

            if city_data:
                details_instance.city.set(city_data)

            details_instance.save()

        return instance

    class Meta:
        '''
        Specifies what fields to be returned.
        '''
        model = TripPost
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'created_at', 'updated_at',
            'title', 'content', 'image', 'image_filter', 'like_id',
            'likes_count', 'comments_count', 'details'
        ]
