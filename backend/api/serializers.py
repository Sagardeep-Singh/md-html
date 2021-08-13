from django.db.models.query import QuerySet
from rest_framework import serializers
from .models import Document, UserProfile
from django.contrib.auth.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', "url", 'username', 'first_name', 'last_name', 'email']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'phone', 'city', 'auto_save']


class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    # owner = serializers.ReadOnlyField(source="owner.username")
    owner = serializers.HyperlinkedRelatedField(many=False,
                                                view_name='user-detail',
                                                read_only=True)

    path = serializers.ReadOnlyField()

    class Meta:
        model = Document
        fields = [
            'id', "url", "owner", 'name', 'path', 'date_added',
            'date_last_updated', 'auto_save'
        ]
