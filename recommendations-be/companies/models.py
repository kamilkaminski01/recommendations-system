from django.db import models

from users.models import User


class CompanyAdmin(User):
    address = None  # type: ignore
    company = models.CharField(max_length=150)

    def __str__(self):
        return self.company

    class Meta:
        verbose_name = "Company Admin"
        verbose_name_plural = "Company Admins"
