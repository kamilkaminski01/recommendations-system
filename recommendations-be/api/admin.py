from django.contrib import admin

from .models import Candidate, Recommender

# Register your models here.
admin.site.register(Recommender)
admin.site.register(Candidate)
