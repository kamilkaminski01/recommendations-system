from django.contrib import admin

from users.admin import UsersAdmin

from .forms import CompanyAdminForm
from .models import CompanyAdmin


class CompanyAdminAdmin(UsersAdmin):
    add_fieldsets = UsersAdmin.change_fields_in_add_fieldsets(
        additional_general_fields=["company"],
        excessive_general_fields=["address"],
        excessive_advanced_fields=["is_staff"],
    )
    fieldsets = UsersAdmin.change_fields_in_fieldsets(
        additional_general_fields=["company"],
        excessive_general_fields=["address"],
        excessive_advanced_fields=["is_staff"],
    )
    list_display = [
        "company",
        "email",
        "first_name",
        "last_name",
    ]
    form = CompanyAdminForm
    readonly_fields = ["company"]


admin.site.register(CompanyAdmin, CompanyAdminAdmin)
