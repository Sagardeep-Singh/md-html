from rest_framework import permissions


class IsOwnerOrAccessDenied(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Write permissions are only allowed to the owner of the snippet.
        return request.user is not None and obj.owner.id == request.user.id