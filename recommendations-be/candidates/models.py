from django.db import models

from recommenders.models import Recommender


class Candidate(models.Model):
    referrer = models.ForeignKey(Recommender, on_delete=models.SET_NULL, null=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(max_length=150, unique=True)

    class StatusChoices(models.TextChoices):
        INVITED = "invited"
        CONFIRMED = "confirmed"

    status = models.CharField(
        max_length=30, choices=StatusChoices.choices, default=StatusChoices.INVITED
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
