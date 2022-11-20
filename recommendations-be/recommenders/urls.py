from django.urls import path

from .views import RecommenderListAPIView, RecommendersAPIView

urlpatterns = [
    path("", RecommenderListAPIView.as_view(), name="recommenders_list_api"),
    path("<int:pk>/", RecommendersAPIView.as_view(), name="recommenders_api"),
]
