from django.db import models

from advertisements.models import Advertisement
from recommenders.models import Recommender


class Candidate(models.Model):
    referrer = models.ForeignKey(Recommender, on_delete=models.SET_NULL, null=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(max_length=150, unique=True)
    advertisement = models.ForeignKey(
        Advertisement,
        on_delete=models.SET_NULL,
        null=True,
        related_name="candidate_advertisement",
        verbose_name="advertisement",
    )
    advertisement_name = models.CharField(
        max_length=150, blank=True, verbose_name="Advertisement"
    )

    class StatusChoices(models.TextChoices):
        INVITED = "invited"
        CONFIRMED = "confirmed"
        CANCELED = "canceled"

    status = models.CharField(
        max_length=30, choices=StatusChoices.choices, default=StatusChoices.INVITED
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def save(self, *args, **kwargs) -> None:
        if self.advertisement:
            self.advertisement_name = self.advertisement.__str__()
        super().save(*args, **kwargs)
