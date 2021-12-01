from django.db import models
from PIL import Image

# Create your models here.
class Personnel(models.Model):
    firstname = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    fnc = models.CharField(max_length=100)
    imgpath = models.CharField('img/logo/lef.png', max_length=100)

    # image = models.ImageField(default = 'img/logo/lef.png',upload_to ='static/img/personnel/')
    # the 'upload_to' attribut define the directory where the file will be save. This will create a new folder in the root directory.
    # if we would like to save our images somewhere else we need to change the to differente variable 

    '''Django-admin also use this as the name of the item in the interactive table'''
    def __str__(self) -> str:
        return self.firstname

    class Meta:
        ordering = ["id",]

    # to resize the image befor saveing , we are going to overide the save() method. for that purpose  we use the super() method
    # we can do that in the views
    # def save(self,*args,**kwargs):
    #     super().save(*args,**kwargs)
    #     img = Image.open(self.image.path)
    #     print(self.image.path)
    #     if img.height > 200 or img.width>200:
    #         output_size = (200,200)
    #         img.thumbnail(output_size)
    #         img.save(self.image.path)