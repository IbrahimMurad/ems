from employee.models import Employee
from rest_framework import serializers


class WriteEmployeeSerializer(serializers.ModelSerializer):
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


class ReadEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "company",
            "department",
            "status",
            "name",
            "email",
            "mobile_number",
            "address",
            "designation",
            "hired_on",
            "days_employed",
        ]
        depth = 1
