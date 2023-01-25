from typing import List

from django.db.models import QuerySet
from rest_framework import generics, status
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from candidates.models import Candidate
from companies.models import CompanyAdmin
from companies.permissions import IsCompanyAdmin

from .serializers import CandidateListSerializer, CandidateUpdateStatusSerializer
from .utils import update_recommender_points


class CandidateListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CandidateListSerializer

    def get_queryset(self) -> QuerySet[Candidate]:
        try:
            company_admin = CompanyAdmin.objects.get(id=self.request.user.id)
            return Candidate.objects.filter(advertisement__company=company_admin)
        except CompanyAdmin.DoesNotExist:
            return Candidate.objects.none()

    def list(self, request: Request, *args, **kwargs) -> Response:
        try:
            queryset = self.filter_queryset(self.get_queryset())
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except CompanyAdmin.DoesNotExist:
            return Response(
                {
                    "message": "You must be a Company Admin to perform this action",
                    "code": "company_admin_not_found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )


class CandidateUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = CandidateUpdateStatusSerializer
    queryset = Candidate.objects.all()
    lookup_field = "pk"

    def retrieve(self, request: Request, *args, **kwargs) -> Response:
        instance: Candidate = self.get_object()
        try:
            company_admin = CompanyAdmin.objects.get(id=self.request.user.id)
        except CompanyAdmin.DoesNotExist:
            return Response(
                {
                    "message": "You must be a Company Admin",
                    "code": "company_admin_not_found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        if instance.advertisement and instance.advertisement.company != company_admin:
            return Response(
                {
                    "message": "You are not authorized to update this candidate",
                    "code": "unauthorized_company_admin",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request: Request, *args, **kwargs) -> Response:
        instance: Candidate = self.get_object()
        if instance.status == Candidate.StatusChoices.INVITED:
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(
            {
                "message": "You can only update status of invited candidates",
                "code": "candidate_status_not_invited",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    def perform_update(self, serializer: CandidateUpdateStatusSerializer) -> None:
        instance: Candidate = serializer.save()
        update_recommender_points(instance)

    def get_permissions(self) -> List[BasePermission]:
        if self.request.method in ["PUT", "PATCH"]:
            return [IsCompanyAdmin()]
        return [IsAuthenticated()]
