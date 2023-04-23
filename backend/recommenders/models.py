from django.db import models

from users.models import User


class Recommender(User):
    current_points = models.PositiveIntegerField(default=0)
    credibility = models.PositiveIntegerField(default=0)

    def __str__(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.email

    class Meta:
        verbose_name = "Recommender"
        verbose_name_plural = "Recommenders"
