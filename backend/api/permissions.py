from rest_framework import permissions
from django.contrib.auth.models import User

class IsOwnerOrAccessDenied(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Write permissions are only allowed to the owner of the snippet.
        return request.user is not None and obj.owner.id == request.user.id


class IsCurrentUser(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Write permissions are only allowed to the owner of the snippet.
        return request.user is not None and (obj == request.user or User.is_superuser)