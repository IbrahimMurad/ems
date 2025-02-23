from rest_framework import serializers

from company.models import Company


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "number_of_departments",
            "number_of_employees",
        ]
