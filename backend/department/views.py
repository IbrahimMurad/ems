from core.permissions import IsManager
from department.models import Department
from department.serializers import ReadDepartmentSerializer, WriteDepartmentSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.select_related("company")
    # permission_classes = [IsAuthenticated, IsManager]

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return ReadDepartmentSerializer
        return WriteDepartmentSerializer
