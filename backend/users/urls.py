from django.urls import path

from .views import UserAPIView, UserDetailsAPIView

urlpatterns = [
    path("", UserAPIView.as_view(), name="users_api"),
    path("details/", UserDetailsAPIView.as_view(), name="user_details"),
]
