from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    '''
    Prevents non-owner from editing profile.
    (If you don't own a profile, you can't make changes to it.)
    '''
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user
