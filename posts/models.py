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

    traveller_number = models.PositiveIntegerField(blank=False)

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

    duration_value = models.PositiveBigIntegerField(blank=False)

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
        if self.duration_value <= 0:
            raise ValidationError("Duration value must be positive.")

        if self.traveller_number <= 0:
            raise ValidationError("Traveller number must be positive.")

        relevant_valid_values = ['all', 'women', 'men', 'nonbinary', 'lgbtq']
        if self.relevant_for not in [
            'all', 'women', 'men', 'nonbinary', 'lgbtq'
                ]:
            raise ValidationError(
                f"Invalid relevant_for value. Valid options are: {', '.join(
                    relevant_valid_values)}."
                    )

        super().clean()

    def save(self, *args, **kwargs):
        '''
        Automatically set the continent based on the selected country.
        '''
        if self.country:
            self.continent = get_continent_by_country(self.country.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"Details for "
            f"{self.trip_post.title} - "  # pylint: disable=no-member
            f"{self.duration_value} "
            f"{self.get_duration_unit_display()}"  # pylint: disable=no-member
        )
