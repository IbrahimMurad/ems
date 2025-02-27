from employee.models import Employee
from employee.serializers import ReadEmployeeSerializer, WriteEmployeeSerializer
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.select_related("department", "company")
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter]
    search_fields = ["first_name", "last_name", "email", "status", "department__name", "company__name", "username"]

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return ReadEmployeeSerializer
        return WriteEmployeeSerializer
