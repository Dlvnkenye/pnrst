# Generated by Django 3.2.9 on 2021-11-29 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('slider', '0004_alter_slide_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slide',
            name='desc',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AlterField(
            model_name='slide',
            name='imgpath',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='slide',
            name='name',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
