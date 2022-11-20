from django.contrib import admin

from users.admin import UsersAdmin

from .forms import RecommenderForm
from .models import Candidate, Recommender


class RecommenderAdmin(UsersAdmin):
    list_display = [
        "first_name",
        "last_name",
        "email",
        "current_points",
        "credibility",
    ]
    form = RecommenderForm


admin.site.register(Recommender, RecommenderAdmin)
admin.site.register(Candidate)
