from core.permissions import IsManager
from department.models import Department
from department.serializers import ReadDepartmentSerializer, WriteDepartmentSerializer
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.select_related("company")
    permission_classes = [IsAuthenticated, IsManager]
    filter_backends = [SearchFilter]
    search_fields = ["name", "company__name"]

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return ReadDepartmentSerializer
        return WriteDepartmentSerializer
