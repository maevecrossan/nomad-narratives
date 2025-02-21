'''

'''

from django.db import models
from cities_light.models import City, Region, Country
from django.contrib.auth.models import User

class TripPost(models.Model):
    """
    Trip Post model, related to 'owner', i.e. a User instance.
    Default image set so that we can always reference image.url.

    This model handles the content of the post (image, article content, title).
    This model does not handle the details of the trip (see TripDetails model).
    """

    image_filter_choices = [
        ('_1977', '1977'),
        ('brannan', 'Brannan'),
        ('earlybird', 'Earlybird'),
        ('hudson', 'Hudson'),
        ('inkwell', 'Inkwell'),
        ('lofi', 'Lo-Fi'),
        ('kelvin', 'Kelvin'),
        ('normal', 'Normal'),
        ('nashville', 'Nashville'),
        ('rise', 'Rise'),
        ('toaster', 'Toaster'),
        ('valencia', 'Valencia'),
        ('walden', 'Walden'),
        ('xpro2', 'X-pro II')
    ]

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = models.TextField(blank=False)
    image = models.ImageField(
        upload_to='images/', default='../default_post_hrftao', blank=True
    )
    image_filter = models.CharField(
        max_length=32, choices=image_filter_choices, default='normal'
    )

    class Meta:
        '''
        Specififes ordering of posts.
        '''
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'


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
    country = models.ForeignKey(Country, on_delete=models.PROTECT)

    region = models.ForeignKey(Region, on_delete=models.PROTECT)

    city = models.ManyToManyField(City)

    traveller_number = models.PositiveIntegerField()

    relevant_for_choices = [
            ('all', 'All Genders & Orientations'),
            ('women', 'Women'),
            ('men', 'Men'),
            ('nonbinary', 'Non-Binary'),
            ('lgbtq', 'LGBTQ+ Travelers'),
        ]
    relevant_for = models.CharField(max_length=10, choices=relevant_for_choices)

    duration_value = models.PositiveBigIntegerField()

    duration_unit_choices = [
        ('days', 'Day(s)'),
        ('weeks', 'Week(s)'),
        ('months', 'Month(s)'),
        ('years', 'Year(s)'),
    ]

    duration_unit = models.CharField(max_length=10, choices=duration_unit_choices)

    def __str__(self):
        return f"Details for {self.trip_post.title} - {self.duration_value} {self.get_duration_unit_display()}"
