from django.contrib.auth import password_validation
from rest_framework import serializers

from users.models import User

from .models import Recommender


class RecommenderSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = Recommender
        fields = ["email", "first_name", "last_name", "password"]

    def create(self, validated_data: dict) -> Recommender:
        recommender = super().create(validated_data)
        recommender.set_password(validated_data["password"])
        recommender.save()
        return recommender

    def update(self, instance: User, validated_data: dict) -> User:
        if validated_data.get("password"):
            validated_data.pop("password")
        return super(RecommenderSerializer, self).update(instance, validated_data)

    def validate_password(self, data: str) -> str:
        password_validation.validate_password(data, self.instance)
        return data


class RecommenderUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommender
        fields = ["email", "first_name", "last_name", "address"]
        read_only_fields = ["email"]


class RecommenderNewPasswordSerializer(serializers.ModelSerializer):
    new_password = serializers.CharField(
        style={"input_type": "password"}, write_only=True, source="password"
    )

    def update(self, instance: User, validated_data: dict) -> User:
        recommender = super().update(instance, validated_data)
        recommender.set_password(validated_data["password"])
        recommender.save()
        return recommender

    def validate_new_password(self, data: str) -> str:
        password_validation.validate_password(data, self.instance)
        return data

    class Meta:
        model = Recommender
        fields = ["new_password"]


class RecommenderDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommender
        fields = [
            "email",
            "first_name",
            "last_name",
            "address",
            "current_points",
            "credibility",
        ]


class RecommenderCredibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommender
        fields = [
            "first_name",
            "last_name",
            "credibility",
        ]
