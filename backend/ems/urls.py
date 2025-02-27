"""
URL configuration for ems project.
"""

from company.views import CompanyViewSet
from department.views import DepartmentViewSet
from django.contrib import admin
from django.urls import include, path
from employee.views import EmployeeViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views
from user_account.views import UserViewSet

rounter = DefaultRouter()

rounter.register("companies", CompanyViewSet, basename="company")
rounter.register("departments", DepartmentViewSet, basename="department")
rounter.register("employees", EmployeeViewSet, basename="employee")
rounter.register("users", UserViewSet, basename="user")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api/", include(rounter.urls)),
    path("api/token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", jwt_views.TokenVerifyView.as_view(), name="token_verify"),
]
