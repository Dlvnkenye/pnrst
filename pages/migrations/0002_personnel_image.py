# Generated by Django 3.2.9 on 2021-11-26 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='personnel',
            name='image',
            field=models.ImageField(default='users/default.jpg', upload_to='users/profile_pics/'),
        ),
    ]
