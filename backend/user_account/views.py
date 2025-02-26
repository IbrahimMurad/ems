from typing import Any

from core.permissions import IsAdmin
from rest_framework import exceptions, permissions, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt import views
from user_account.models import User
from user_account.serializers import UserSerializer
from user_account.services import refresh_token, set_tokens


class UserViewSet(viewsets.ModelViewSet):
    """A view set for users management
    This view set is manged only by an admin
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated, IsAdmin]


class ObtainToken(views.TokenObtainPairView):
    """
    Handle user login by providing JWT tokens in cookies.
    Implements secure token storage using HTTP-only cookies.
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        try:
            response = super().post(request, *args, **kwargs)
            return set_tokens(response)
        except Exception:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


class RefreshToken(views.TokenRefreshView):
    """
    Handle token refresh requests by validating refresh token from cookies
    and providing a new access token.
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        refresh = request.COOKIES.get("refresh")
        if not refresh:
            return Response(
                {"detail": "No refresh token found in cookies"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        request.data["refresh"] = refresh
        try:
            response = super().post(request, *args, **kwargs)
            return refresh_token(response)
        except exceptions.InvalidToken:
            return Response(
                {"detail": "Invalid or expired refresh token"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except Exception:
            return Response({"detail": "Token refresh failed"}, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):

    def post(self, request: Request) -> Response:
        response = Response({"details": "logged out successfully"})
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response
