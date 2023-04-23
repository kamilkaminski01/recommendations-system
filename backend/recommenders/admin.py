from django.contrib import admin

from users.admin import UsersAdmin

from .forms import RecommenderForm
from .models import Recommender


class RecommenderAdmin(UsersAdmin):
    list_display = [
        "email",
        "first_name",
        "last_name",
        "current_points",
        "credibility",
    ]
    form = RecommenderForm


admin.site.register(Recommender, RecommenderAdmin)
