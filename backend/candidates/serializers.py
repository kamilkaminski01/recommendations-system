from rest_framework import serializers

from .models import Candidate


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = [
            "first_name",
            "last_name",
            "email",
        ]


class CandidateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "status",
            "advertisement",
            "advertisement_name",
        ]


class CandidateUpdateStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ["status"]
