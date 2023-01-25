from django.urls import path

from .views import CandidateListAPIView, CandidateUpdateAPIView

urlpatterns = [
    path("", CandidateListAPIView.as_view(), name="candidates_api"),
    path(
        "update/<int:pk>/", CandidateUpdateAPIView.as_view(), name="candidates_update"
    ),
]
