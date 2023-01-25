from django.urls import path

from recommenders.views import RecommenderCredibilityView

urlpatterns = [
    path("ranking/", RecommenderCredibilityView.as_view(), name="recommenders_ranking"),
]
