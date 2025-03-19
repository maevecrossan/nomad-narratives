'''
Posts Serializer
'''
from rest_framework import serializers
from cities_light.models import City, Country
from likes.models import Like
from .models import TripPost, TripDetails


class TripDetailsSerializer(serializers.ModelSerializer):
    '''
    Serializer for TripDetails model.
    '''
    continent = serializers.ReadOnlyField()
    country = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())
    city = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all())
    duration_display = serializers.SerializerMethodField()

    def get_duration_display(self, obj):
        '''
        Returns a human-readable string representing the trip's duration.
        '''
        return f"{obj.duration_value} {obj.get_duration_unit_display()}"

    def validate_duration_value(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Duration value must be positive."
                )
        return value

    def validate_duration_unit(self, value):
        valid_units = ['days', 'weeks', 'months', 'years']
        if value not in valid_units:
            raise serializers.ValidationError(
                f"Invalid duration unit. Valid options are: {
                    ', '.join(valid_units)
                    }."
                )
        return value

    class Meta:
        '''
        Specifies the model and the fields to be included in the
        serialized output.
        '''
        model = TripDetails
        fields = [
            'id', 'traveller_number', 'relevant_for',
            'duration_value', 'duration_unit', 'duration_display',
            'continent', 'country', 'city'
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
    image_alt_text = serializers.CharField(
        required=True,
        allow_blank=False)

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
        # Make sure obj is not a dictionary (like during serialization 
        # or validation)
        if isinstance(obj, TripPost):  # Ensure it's the model instance
            request = self.context['request']
            return request.user == obj.owner
        return False  # Default behavior when it's not a model instance

    def get_like_id(self, obj):
        '''
        Retrieves the ID of the 'Like' associated with
        the given post and the current user.
        '''
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(   # pylint: disable=no-member
                owner=user, post=obj
            ).first()
            return like.id if like else None
        return None

    def create(self, validated_data):
        '''
        Handle creation of TripPost and related TripDetails.
        '''
        details_data = validated_data.pop('details')
        print("DETAILS DATA:", details_data)

        # Create the trip_post instance
        trip_post = TripPost.objects.create(**validated_data)

        # Create the trip_details instance and link it with the trip_post
        trip_details = TripDetails.objects.create(
            trip_post=trip_post, **details_data
            )

        return trip_post, trip_details

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
            # city_data = details_data.pop('city', [])

            for field, value in details_data.items():
                setattr(details_instance, field, value)

            # if city_data:
            #     details_instance.city.set(city_data)

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
            'title', 'content', 'image', 'image_alt_text',
            'like_id', 'likes_count', 'comments_count', 'details'
        ]
