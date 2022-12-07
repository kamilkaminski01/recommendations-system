from django.contrib import admin

from users.admin import UsersAdmin

from .forms import CompanyAdminForm
from .models import Advertisment, CompanyAdmin


class CompanyAdminAdmin(UsersAdmin):
    add_fieldsets = UsersAdmin.change_fields_in_add_fieldsets(
        additional_general_fields=["company"],
        excessive_general_fields=["address"],
    )
    fieldsets = UsersAdmin.change_fields_in_fieldsets(
        additional_general_fields=["company"],
        excessive_general_fields=["address"],
    )
    list_display = [
        "company",
        "email",
        "first_name",
        "last_name",
    ]
    form = CompanyAdminForm


class AdvertismentAdmin(admin.ModelAdmin):
    list_display = ["company", "title", "type", "reward_for_approval"]


admin.site.register(CompanyAdmin, CompanyAdminAdmin)
admin.site.register(Advertisment, AdvertismentAdmin)
