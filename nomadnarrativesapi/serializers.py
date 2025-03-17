'''
This module defines a serializer for the current user details,
including the user's profile information.
It extends the `UserDetailsSerializer` from the `dj_rest_auth`
package, adding fields for the user's profile ID
and profile image URL.
'''
from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers
from cities_light.models import Country, City


class CurrentUserSerializer(UserDetailsSerializer):
    '''
    Serializer for the current user, including profile information.

    This serializer adds the `profile_id` and `profile_image` fields to the
    base `UserDetailsSerializer`.
    It retrieves the profile's ID and image URL associated with the user.
    '''
    profile_id = serializers.ReadOnlyField(source='profile.id')
    profile_image = serializers.ReadOnlyField(source='profile.image.url')

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + (
            'profile_id', 'profile_image'
            )


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name', 'country']
