from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = (
    [
        path("admin/", admin.site.urls),
        path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
        path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
        path("api/users/", include("users.urls")),
        path("api/recommenders/", include("recommenders.urls")),
        path("api/shop/", include("shop.urls")),
        path("api/advertisements/", include("advertisements.urls")),
        path("api/candidates/", include("candidates.urls")),
    ]
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # type: ignore
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # type: ignore
)
