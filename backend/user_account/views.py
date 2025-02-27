from core.permissions import IsAdmin
from rest_framework import response, views, viewsets
from rest_framework.filters import SearchFilter
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
    filter_backends = [SearchFilter]
    search_fields = ["username", "email", "role"]


class CheckAccess(views.APIView):
    """A view to check if a user has access to the system"""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return response.Response({"message": "You have access to the system"})
