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

    def validate_status(self, value):
        if self.instance and self.instance.status != value:
            if (
                self.instance.status == Employee.StatusChoices.APPLICATION_RECEIVED
                and value == Employee.StatusChoices.HIRED
            ):
                raise serializers.ValidationError(detail="Employee must be interviewed before hiring", code="invalid")
        return value

    def validate_company(self, value):
        if self.instance and self.instance.company != self.instance.department.company:
            raise serializers.ValidationError(detail="The department must be related to the company", code="invalid")
        return value


class ReadEmployeeSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="employee-detail", lookup_field="pk")

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
            "url",
        ]
        depth = 1
