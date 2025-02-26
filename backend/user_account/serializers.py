from rest_framework import serializers
from user_account.models import User


class UserSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(view_name="user-detail")

    class Meta:
        model = User
        fields = [
            "id",
            "url",
            "last_login",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_active",
            "date_joined",
            "password",
            "role",
        ]
        read_only_fields = ["id", "last_login", "is_active", "date_joined"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def validate(self, attrs):
        # Remove password if it is empty when updating
        if self.instance and "password" in attrs and not attrs["password"]:
            attrs.pop("password")
        return super().validate(attrs)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        if "password" in validated_data:
            password = validated_data.pop("password")
            instance.set_password(password)
        return super().update(instance, validated_data)
