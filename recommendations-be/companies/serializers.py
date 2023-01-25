from django.contrib.auth import password_validation
from rest_framework import serializers

from users.models import User

from .models import CompanyAdmin


class CompanyAdminDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyAdmin
        fields = [
            "email",
            "first_name",
            "last_name",
            "company",
            "is_staff",
        ]
        read_only_fields = ["company, is_staff"]


class CompanyAdminUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyAdmin
        fields = ["email", "first_name", "last_name"]
        read_only_fields = ["email"]


class CompanyAdminNewPasswordSerializer(serializers.ModelSerializer):
    new_password = serializers.CharField(
        style={"input_type": "password"}, write_only=True, source="password"
    )

    def update(self, instance: User, validated_data: dict) -> User:
        company_admin = super().update(instance, validated_data)
        company_admin.set_password(validated_data["password"])
        company_admin.save()
        return company_admin

    def validate_new_password(self, data: str) -> str:
        password_validation.validate_password(data, self.instance)
        return data

    class Meta:
        model = CompanyAdmin
        fields = ["new_password"]
