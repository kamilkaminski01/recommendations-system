from django.urls import path

from .views import AdvertisementsAPIView, AdvertisementsListCreateAPIView

urlpatterns = [
    path("", AdvertisementsListCreateAPIView.as_view(), name="advertisements_list"),
    path("details/<int:pk>/", AdvertisementsAPIView.as_view(), name="advertisements"),
]
