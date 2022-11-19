from django.urls import path

from .views import RecommenderDetailedAPIView, RecommendersAPIView, RecommendersList

urlpatterns = [
    path("", RecommendersAPIView.as_view(), name="recommenders_api"),
    path("list/", RecommendersList.as_view(), name="recommenders_api_list"),
    path(
        "<int:pk>",
        RecommenderDetailedAPIView.as_view(),
        name="recommender_detailed_api",
    ),
]
