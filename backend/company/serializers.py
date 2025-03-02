from company.models import Company
from rest_framework import serializers


class CompanySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="company-detail", lookup_field="pk")

    class Meta:
        model = Company
        fields = "__all__"
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "number_of_departments",
            "number_of_employees",
            "url",
        ]
