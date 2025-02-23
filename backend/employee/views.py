from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from employee.models import Employee
from employee.serializers import EmployeeSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]
