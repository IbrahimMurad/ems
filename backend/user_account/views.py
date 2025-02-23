from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from core.permissions import IsAdminOrOwner
from user_account.models import User
from user_account.serializers import UserOwnerSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminOrOwner]

    def get_serializer_class(self):
        if self.request.user.is_admin:
            return UserSerializer
        return UserOwnerSerializer
