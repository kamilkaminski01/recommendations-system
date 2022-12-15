from django.contrib import admin

from users.admin import UsersAdmin

from .forms import RecommenderForm
from .models import Candidate, Recommender


class RecommenderAdmin(UsersAdmin):
    list_display = [
        "email",
        "first_name",
        "last_name",
        "current_points",
        "credibility",
    ]
    form = RecommenderForm


class CandidateAdmin(admin.ModelAdmin):
    list_display = [
        "email",
        "first_name",
        "last_name",
        "status",
        "referrer",
    ]


admin.site.register(Recommender, RecommenderAdmin)
admin.site.register(Candidate, CandidateAdmin)
