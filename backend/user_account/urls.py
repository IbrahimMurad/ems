from django.urls import path
from user_account.views import ObtainToken, RefreshToken

urlpatterns = [
    path("login/", ObtainToken.as_view(), name="login"),
    path("refresh/", RefreshToken.as_view(), name="refresh"),
]
