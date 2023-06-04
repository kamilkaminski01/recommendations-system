from django.contrib import admin

from .models import Image, PurchaseHistory, Reward


class ImageInline(admin.TabularInline):
    model = Image
    extra = 1


class RewardAdmin(admin.ModelAdmin):
    inlines = [ImageInline]
    list_display = ["title", "cost", "type"]


class PurchaseHistoryAdmin(admin.ModelAdmin):
    list_display = ["recommender", "reward", "points_spent"]
    readonly_fields = [
        "recommender",
        "reward",
        "purchase_date",
        "points_spent",
        "shipping_address",
    ]


admin.site.register(Reward, RewardAdmin)
admin.site.register(PurchaseHistory, PurchaseHistoryAdmin)
