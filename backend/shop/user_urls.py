from django.urls import path

from .views import PurchaseHistoryListView

urlpatterns = [
    path("", PurchaseHistoryListView.as_view(), name="purchase_history"),
]
