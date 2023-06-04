from textwrap import shorten

from django.db import models

from recommenders.models import Recommender

from .utils import validate_file_extension


def upload_to_rewards(instance, filename: str) -> str:
    return f"rewards/{instance.reward.id}/{filename}"


class Reward(models.Model):
    title = models.CharField(max_length=80)
    cost = models.PositiveIntegerField()
    short_description = models.TextField(max_length=300)
    long_description = models.TextField(null=True, blank=True)

    class TypeChoices(models.TextChoices):
        PHYSICAL = "PHYSICAL"
        DIGITAL = "DIGITAL"

    type = models.CharField(max_length=10, choices=TypeChoices.choices)

    def __str__(self):
        max_length = 60
        if len(self.title) > max_length:
            return shorten(self.title, max_length, placeholder="...")
        return self.title

    class Meta:
        verbose_name = "Reward"
        verbose_name_plural = "Rewards"


class Image(models.Model):
    reward = models.ForeignKey(
        Reward,
        on_delete=models.CASCADE,
        related_name="reward_images",
        verbose_name="reward",
    )
    image = models.FileField(
        upload_to=upload_to_rewards,
        validators=[validate_file_extension],
        help_text="First image will be displayed as reward's main image in shop.",
        verbose_name="image",
    )

    def __str__(self):
        return self.reward.title

    class Meta:
        verbose_name = "Image"
        verbose_name_plural = "Images"


class PurchaseHistory(models.Model):
    recommender = models.ForeignKey(
        Recommender,
        on_delete=models.CASCADE,
        related_name="recommender_purchase_histories",
        verbose_name="recommender",
    )
    reward = models.ForeignKey(
        Reward,
        on_delete=models.CASCADE,
        related_name="purchase_history_reward",
        verbose_name="reward",
    )
    purchase_date = models.DateTimeField(
        auto_now_add=True, verbose_name="purchase date"
    )
    points_spent = models.PositiveIntegerField(verbose_name="points spent")

    class StatusChoices(models.TextChoices):
        ORDERED = ("ORDERED",)
        SENT = ("SENT",)
        RECEIVED = ("RECEIVED",)

    status = models.CharField(
        max_length=8,
        choices=StatusChoices.choices,
        default=StatusChoices.ORDERED,
        verbose_name="status",
    )

    shipping_address = models.TextField(
        verbose_name="shipping address", null=True, blank=True
    )

    def __str__(self):
        return f"{self.recommender}: {self.reward}"

    class Meta:
        verbose_name = "Purchase history"
        verbose_name_plural = "Purchase histories"
