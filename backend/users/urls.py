from django.urls import include, path

from .views import UserAPIView, UserDetailsAPIView

urlpatterns = [
    path("", UserAPIView.as_view(), name="users_api"),
    path("details/", UserDetailsAPIView.as_view(), name="user_details"),
    path("purchase-history/", include("shop.user_urls"), name="purchase_history"),
]
