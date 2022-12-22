from django.urls import path

from .views import RewardDetailAPIView, RewardListAPIView

urlpatterns = [
    path("rewards/", RewardListAPIView.as_view(), name="rewards"),
    path("rewards/<int:pk>/", RewardDetailAPIView.as_view(), name="reward_details"),
]
