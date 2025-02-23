from rest_framework import serializers

from department.models import Department


class DepartmentSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(view_name="department-detail")
    company_name = serializers.SlugRelatedField(
        read_only=True, slug_field="name", source="company"
    )
    company_url = serializers.HyperlinkedRelatedField(
        read_only=True, view_name="company-detail", source="company"
    )

    class Meta:
        model = Department
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at", "number_of_employees"]
