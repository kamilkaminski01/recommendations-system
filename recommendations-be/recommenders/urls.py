from django.urls import path

from .views import (
    RecommenderAPIView,
    RecommenderCredibilityView,
    RecommenderDetailsAPIView,
)

urlpatterns = [
    path("", RecommenderAPIView.as_view(), name="recommenders_api"),
    path(
        "details/<int:pk>/",
        RecommenderDetailsAPIView.as_view(),
        name="recommender_details",
    ),
    path("ranking/", RecommenderCredibilityView.as_view(), name="recommenders_ranking"),
]
