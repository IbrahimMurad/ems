from core.permissions import IsAdmin
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from user_account.models import User
from user_account.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """A view set for users management
    This view set is manged only by an admin
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
