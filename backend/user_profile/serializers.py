from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile


class UserSerializer(serializers.HyperlinkedModelSerializer):
    # profile = serializers.PrimaryKeyRelatedField(
    #     many=False, queryset=UserProfile.objects.all())
    password = serializers.ReadOnlyField()
    class Meta:
        model = User
        fields = [
            'id', "url", 'username', 'password', 'first_name', 'last_name',
            'email'
        ]


class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'phone', 'city', 'auto_save']
