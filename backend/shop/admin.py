from django.contrib import admin

from .models import Image, Reward


class ImageInline(admin.TabularInline):
    model = Image
    extra = 1


class RewardAdmin(admin.ModelAdmin):
    inlines = [ImageInline]
    list_display = ["title", "cost", "type"]


admin.site.register(Reward, RewardAdmin)
