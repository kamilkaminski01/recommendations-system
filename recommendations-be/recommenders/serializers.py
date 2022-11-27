from django.contrib.auth import password_validation
from rest_framework import serializers

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

    def validate_password(self, data: str) -> str:
        password_validation.validate_password(data, self.instance)
        return data


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


class RecommenderUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = Recommender
        fields = ["email", "first_name", "last_name", "address", "password"]
        read_only_fields = ["email"]

    def update(self, instance, validated_data: dict) -> Recommender:
        recommender = super().update(validated_data)
        recommender.set_password(validated_data["password"])
        recommender.save()
        return recommender

    def validate_password(self, data: str) -> str:
        password_validation.validate_password(data, self.instance)
        return data
