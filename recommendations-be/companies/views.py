from typing import List

from rest_framework import generics, mixins, status
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from candidates.models import Candidate
from candidates.serializers import CandidateSerializer
from recommenders.models import Recommender

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
    queryset = Advertisement.objects.all()

    def get(self, request: Request, *args, **kwargs) -> Response:
        return self.retrieve(request, *args, **kwargs)

    def post(self, request: Request, *args, **kwargs) -> Response:
        serializer: CandidateSerializer = CandidateSerializer(data=request.data)
        if advertisement_id := kwargs.get("pk", None):
            advertisement = Advertisement.objects.get(id=advertisement_id)
            recommender = Recommender.objects.get(id=self.request.user.id)
            if serializer.is_valid():
                serializer.save(
                    referrer=recommender,
                    advertisement=advertisement,
                    status=Candidate.StatusChoices.INVITED,
                )
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request: Request, *args, **kwargs) -> Response:
        return self.update(request, *args, **kwargs)

    def delete(self, request: Request, *args, **kwargs) -> Response:
        return self.destroy(request, *args, **kwargs)

    def get_serializer_class(self) -> ModelSerializer:
        if self.request.method == "POST":
            return CandidateSerializer
        return AdvertisementSerializer

    def get_permissions(self) -> List[BasePermission]:
        if self.request.method in ["PUT", "DELETE"]:
            return [IsCompanyAdminOwner()]
        elif self.request.method == "POST":
            return [IsAuthenticated()]
        return []
