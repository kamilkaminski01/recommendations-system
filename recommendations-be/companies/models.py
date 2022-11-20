from django.db import models

from users.models import User


class CompanyAdmin(User):
    company = models.CharField(max_length=150)

    def __str__(self):
        return self.company

    class Meta:
        verbose_name = "Company Admin"
        verbose_name_plural = "Company Admins"


class Advertisment(models.Model):
    company = models.ForeignKey(CompanyAdmin, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)

    class Types(models.TextChoices):
        COMMERCIAL = "COMMERCIAL"
        RECRUITMENT = "RECRUITMENT"

    type = models.CharField(max_length=11, choices=Types.choices)
    reward_for_approval = models.PositiveIntegerField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Advertisment"
        verbose_name_plural = "Advertisments"
