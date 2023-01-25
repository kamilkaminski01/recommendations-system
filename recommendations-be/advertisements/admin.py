from django.contrib import admin

from .models import Advertisement


class AdvertisementAdmin(admin.ModelAdmin):
    list_display = ["company", "title", "type", "reward_for_approval"]


admin.site.register(Advertisement, AdvertisementAdmin)
