from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    message = "You must be logged as that user to perform this action"

    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.id
