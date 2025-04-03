'''
Models for the TripPost application.

This module defines the 'TripPost' and 'TripDetails' models, which handles
content posted by users.
'''
from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from cities_light.models import City, Country
from utils.continents import get_continent_by_country


class TripPost(models.Model):
    '''
    Trip Post model, related to 'owner', i.e. a User instance.
    Default image set so that we can always reference image.url.

    This model handles the content of the post (image, article content, title).
    This model does not handle the details of the trip (see TripDetails model).
    '''

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE
        )
    created_at = models.DateTimeField(
        auto_now_add=True
        )
    updated_at = models.DateTimeField(
        auto_now=True
        )
    title = models.CharField(
        max_length=255,
        blank=False
        )
    content = models.TextField(
        blank=False
        )
    image = models.ImageField(
        upload_to='images/',
        default='../default_post_hrftao',
        blank=False
        )
    image_alt_text = models.CharField(
        max_length=255,
        blank=False,
        help_text="Please describe your image in case\
              there is an issue displaying it."
        )

    def clean(self):
        '''
        Custom validation for TripPost model.
        Ensures that the fields are valid before saving.
        '''
        if not self.title:
            raise ValidationError("Title is required.")

        if not self.content:
            raise ValidationError("Content is required.")

        if not self.image:
            raise ValidationError("Image is required.")

        if not self.image_alt_text:
            raise ValidationError("Image alt text is required.")

        super().clean()

    class Meta:
        '''
        Specififes ordering of posts.
        '''
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'  # pylint: disable=no-member


class TripDetails(models.Model):
    '''
    Outlines the additional details a user will add to their TripPost.

    These details help categorize and filter trip content based on location,
    traveler demographics, and trip length, providing a richer context
    for the main TripPost
    '''
    trip_post = models.OneToOneField(
        TripPost, on_delete=models.CASCADE, related_name="details"
        )

    continent = models.CharField(max_length=20, blank=True, editable=False)

    country = models.ForeignKey(
        Country, on_delete=models.SET_NULL, null=True, blank=False
        )

    city = models.ForeignKey(
        City, on_delete=models.SET_NULL, null=True, blank=False
        )

    relevant_for_choices = [
            ('all', 'All Genders & Orientations'),
            ('women', 'Women'),
            ('men', 'Men'),
            ('nonbinary', 'Non-Binary'),
            ('lgbtq', 'LGBTQ+ Travelers'),
        ]
    relevant_for = models.CharField(
        max_length=10, choices=relevant_for_choices, blank=False
        )

    traveller_number_choices = [
        (str(i), str(i)) for i in range(1, 11)] + [('10+', '10+')]

    traveller_number = models.CharField(
        max_length=3, choices=traveller_number_choices, blank=False
    )

    duration_value_choices = [
        (str(i), str(i)) for i in range(1, 11)] + [('10+', '10+')]

    duration_value = models.CharField(
        max_length=3, choices=duration_value_choices, blank=False
    )

    duration_unit_choices = [
        ('days', 'Day(s)'),
        ('weeks', 'Week(s)'),
        ('months', 'Month(s)'),
        ('years', 'Year(s)'),
    ]

    duration_unit = models.CharField(
        max_length=10, choices=duration_unit_choices, blank=False
        )

    def clean(self):
        '''
        Custom validation for TripDetails model.
        '''

        super().clean()

        if self.duration_value not in range(1, 12):  # 1 to 11 (10+)
            raise ValidationError(
                "Duration value must be between 1 and 10+.")

        if self.traveller_number not in range(1, 12):  # 1 to 11 (10+)
            raise ValidationError(
                "Traveller number must be between 1 and 10+.")

    def save(self, *args, **kwargs):
        '''
        Automatically set the continent based on the selected country.
        '''
        if self.country:
            self.continent = get_continent_by_country(self.country.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"Details for {
                self.trip_post.title} - "  # pylint: disable=no-member
            f"{self.get_duration_value_display()} "
            f"{self.get_duration_unit_display()}"  # pylint: disable=no-member
        )
