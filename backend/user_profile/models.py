from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=CASCADE)
    phone = models.CharField(max_length=15, default="")
    city = models.CharField(max_length=50, default="")
    auto_save = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.user.first_name + " " + self.user.last_name
