from django.db import models
from django.contrib.auth.models import User

from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=CASCADE)
    phone = models.CharField(max_length=15, default="")
    city = models.CharField(max_length=50, default="")
    auto_save = models.BooleanField(default=True)


# Create your models here.
class Document(models.Model):
    owner = models.ForeignKey('auth.User', related_name='document', on_delete=models.CASCADE)
    name = models.CharField(max_length=100,null=False)
    path = models.CharField(max_length=100,null=False)
    date_added = models.DateTimeField(auto_now_add=True)
    date_last_updated = models.DateTimeField(auto_now=True)
    auto_save = models.BooleanField(default=None)
