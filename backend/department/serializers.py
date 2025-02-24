from department.models import Department
from rest_framework import serializers


class WriteDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at", "number_of_employees"]


class ReadDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "number_of_employees",
            "name",
            "company",
        ]
        depth = 1
