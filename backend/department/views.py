from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from core.permissions import IsManager
from department.models import Department
from department.serializers import DepartmentSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.select_related("company")
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, IsManager]
