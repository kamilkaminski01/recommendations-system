from typing import Any, Dict

from rest_framework import serializers

from recommenders.models import Recommender

from .models import Image, PurchaseHistory, Reward


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["image"]


class RewardListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField("get_image")

    class Meta:
        model = Reward
        fields = [
            "id",
            "title",
            "cost",
            "short_description",
            "type",
            "image",
        ]

    def get_image(self, reward):
        image = Image.objects.filter(reward=reward).first()
        if not image:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(image.image.url)


class RewardDetailSerializer(serializers.ModelSerializer):
    reward_images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Reward
        fields = [
            "id",
            "title",
            "cost",
            "short_description",
            "long_description",
            "type",
            "reward_images",
        ]


class PurchaseHistorySerializer(serializers.ModelSerializer):
    reward = RewardDetailSerializer(many=False, read_only=True)
    purchase_date = serializers.SerializerMethodField()

    def get_purchase_date(self, obj):
        return obj.purchase_date.strftime("%d/%m/%Y")

    class Meta:
        model = PurchaseHistory
        fields = [
            "id",
            "reward",
            "purchase_date",
            "points_spent",
            "shipping_address",
        ]


class PurchaseHistoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseHistory
        fields = ["reward", "shipping_address"]

    def validate(self, data: Dict[str, Any]) -> Dict[str, Any]:
        user = self.context["request"].user
        recommender = Recommender.objects.get(pk=user.id)
        reward = data.get("reward", None)
        if recommender.current_points < reward.cost:
            raise serializers.ValidationError(
                "Not enough points to buy this reward.", "not_enough_points"
            )
        return data
