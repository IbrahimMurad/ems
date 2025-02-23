from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_admin


class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_manager or request.user.is_admin


class IsManagerOrOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            obj.id == request.user.id
            or request.user.is_manager
            or request.user.is_admin
        )


class IsAdminOrOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        if view.action in ["update", "partial_update", "retrieve"]:
            return obj.id == request.user.id or request.user.is_admin
        return request.user.is_admin
