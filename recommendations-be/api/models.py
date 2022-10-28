from django.contrib.auth.models import AbstractUser
from django.db import models


class Recommender(AbstractUser):
    email = models.EmailField(unique=True)
    address = models.TextField(max_length=200, blank=True, null=True)
    current_points = models.PositiveIntegerField(default=0)
    credibility = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "Recommender"
        verbose_name_plural = "Recommenders"


class Candidate(models.Model):
    referrer = models.ForeignKey(Recommender, on_delete=models.SET_NULL, null=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(max_length=150, blank=True, null=True)

    class StatusChoices(models.TextChoices):
        CONFIRMED = "confirmed"
        INVITED = "invited"

    status = models.CharField(
        max_length=30, choices=StatusChoices.choices, default=StatusChoices.INVITED
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
