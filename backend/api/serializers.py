from rest_framework import serializers
from .models import Document

class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    path = serializers.ReadOnlyField()
    class Meta:
        model = Document
        fields = [
            'id', "url","owner", 'name', 'path', 'date_added', 'date_last_updated',
            'auto_save'
        ]

