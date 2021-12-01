from django.core.exceptions import ValidationError
from django.db import models

# Create your models here.


class Slide(models.Model):
    name = models.CharField(max_length=50, blank=True)
    desc = models.CharField(max_length=150, blank=True)
    imgpath = models.CharField(max_length=100)

    '''Django-admin also use this as the name of the item in the interactive table'''
    def __str__(self) -> str:
        if len(self.name) >25:
            return (self.name[:25] + "...")
        return self.name

    class Meta:
        ordering = ["id",]

    # TODO: prevent saving more than 4 items, without preventing editing
    # def save(self, *args, **kwargs):
    #     if Slide.objects.all().count() <4:
    #         return super(Slide, self).save(*args, **kwargs) 
    #     print(Slide.objects.all().count())
    #     raise ValidationError("slides number must be less than 4")

