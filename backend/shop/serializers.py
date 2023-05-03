from rest_framework import serializers

from .models import Image, Reward


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
