# Generated by Django 3.2.25 on 2025-02-25 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0010_auto_20250221_1234'),
    ]

    operations = [
        migrations.AddField(
            model_name='trippost',
            name='image_alt_text',
            field=models.CharField(blank=True, help_text='Please describe your image in case              there is an issue displaying it.', max_length=255),
        ),
    ]
