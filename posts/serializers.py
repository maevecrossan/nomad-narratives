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
    country = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all())
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all()
                                              )
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

    def validate_relevant_for(self, value):
        valid_values = ['all', 'women', 'men', 'nonbinary', 'lgbtq']
        if value not in valid_values:
            raise serializers.ValidationError(
                f"Invalid relevant_for value. Valid options are: {
                    ', '.join(valid_values)
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
    # Fields to directly expose for filtering or searching
    country = serializers.CharField(
        source='details.country.name', read_only=True
        )
    city = serializers.CharField(source='details.city.name', read_only=True)
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

        if isinstance(obj, TripPost):
            request = self.context['request']
            return request.user == obj.owner
        return False

    def get_like_id(self, obj):
        '''
        Retrieves the ID of the 'Like' associated with
        the given post and the current user.
        '''
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

        validated_data['owner'] = self.context['request'].user

        trip_post = TripPost.objects.create(**validated_data)

        TripDetails.objects.create(
            trip_post=trip_post, **details_data
        )

        return trip_post

    def update(self, instance, validated_data):
        '''
        Handle update of TripPost and related TripDetails.
        '''
        details_data = validated_data.pop('details')

        instance = super().update(instance, validated_data)

        if details_data:
            details_instance = instance.details

            for field, value in details_data.items():
                setattr(details_instance, field, value)

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
            'like_id', 'likes_count', 'comments_count', 'details',
            'country', 'city'
        ]
