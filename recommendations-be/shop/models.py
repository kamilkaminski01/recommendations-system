from textwrap import shorten

from django.db import models

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
