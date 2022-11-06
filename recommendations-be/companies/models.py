from django.db import models

from users.models import User


class CompanyAdmin(User):
    company = models.CharField(max_length=150)

    def __str__(self):
        return self.company

    class Meta:
        verbose_name = "CompanyAdmin"
        verbose_name_plural = "CompanyAdmins"
