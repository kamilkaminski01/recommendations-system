from typing import List

from rest_framework import generics, mixins
from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Advertisement, CompanyAdmin
from .permissions import IsCompanyAdmin, IsCompanyAdminOwner
from .serializers import AdvertisementSerializer


class AdvertisementsListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = AdvertisementSerializer
    queryset = Advertisement.objects.all()

    def perform_create(self, serializer: AdvertisementSerializer) -> None:
        company = CompanyAdmin.objects.get(pk=self.request.user.id)
        serializer.save(company=company)

    def get_permissions(self) -> List[BasePermission]:
        if self.request.method == "POST":
            return [IsCompanyAdmin()]
        return []


class AdvertisementsAPIView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):
    serializer_class = AdvertisementSerializer
    queryset = Advertisement.objects.all()

    def get(self, request: Request, *args, **kwargs) -> Response:
        return self.retrieve(request, *args, **kwargs)

    def put(self, request: Request, *args, **kwargs) -> Response:
        return self.update(request, *args, **kwargs)

    def delete(self, request: Request, *args, **kwargs) -> Response:
        return self.destroy(request, *args, **kwargs)

    def get_permissions(self) -> List[BasePermission]:
        if self.request.method in ["PUT", "DELETE"]:
            return [IsCompanyAdminOwner()]
        return []
