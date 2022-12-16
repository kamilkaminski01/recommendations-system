from django.urls import path

from .views import (
    RecommenderDetailsAPIView,
    RecommenderListCreateAPIView,
    RecommenderUpdateAPIView,
)

urlpatterns = [
    path("", RecommenderListCreateAPIView.as_view(), name="recommenders_api"),
    path(
        "details/<int:pk>/",
        RecommenderDetailsAPIView.as_view(),
        name="recommender_details",
    ),
    path(
        "update/<int:pk>/",
        RecommenderUpdateAPIView.as_view(),
        name="recommender_update",
    ),
]
