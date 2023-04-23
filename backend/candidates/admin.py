from django.contrib import admin

from .models import Candidate


class CandidateAdmin(admin.ModelAdmin):
    list_display = [
        "email",
        "first_name",
        "last_name",
        "status",
        "advertisement_name",
        "referrer",
    ]
    exclude = ("advertisement_name",)


admin.site.register(Candidate, CandidateAdmin)
