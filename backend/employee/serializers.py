from rest_framework import serializers

from employee.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(view_name="employee-detail")
    company_name = serializers.SlugRelatedField(
        read_only=True, slug_field="name", source="company"
    )
    company_url = serializers.HyperlinkedRelatedField(
        read_only=True, view_name="company-detail", source="company"
    )
    department_name = serializers.SlugRelatedField(
        read_only=True, slug_field="name", source="department"
    )
    department_url = serializers.HyperlinkedRelatedField(
        read_only=True, view_name="department-detail", source="department"
    )

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
