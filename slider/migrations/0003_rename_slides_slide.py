# Generated by Django 3.2.9 on 2021-11-26 14:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('slider', '0002_alter_slides_options'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Slides',
            new_name='Slide',
        ),
    ]
