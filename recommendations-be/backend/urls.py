from django.contrib import admin
from django.urls import path

from recommenders.views import RecommendersList

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/recommenders/", RecommendersList.as_view()),
]
