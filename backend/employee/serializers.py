from rest_framework import serializers

from employee.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "hired_on",
            "days_employed",
        ]
