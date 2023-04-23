from typing import List, Union

from rest_framework import generics, mixins, status
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from companies.models import CompanyAdmin
from companies.serializers import (
    CompanyAdminDetailsSerializer,
    CompanyAdminNewPasswordSerializer,
    CompanyAdminUpdateSerializer,
)
from recommenders.models import Recommender
from recommenders.serializers import (
    RecommenderDetailsSerializer,
    RecommenderNewPasswordSerializer,
    RecommenderSerializer,
    RecommenderUpdateSerializer,
)


class UserAPIView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.CreateModelMixin,
    generics.GenericAPIView,
):
    def get(self, request: Request, *args, **kwargs) -> Response:
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs) -> Response:
        return self.create(request, *args, **kwargs)

    def put(self, request: Request, *args, **kwargs) -> Response:
        return self.update(request, *args, **kwargs)

    def patch(self, request: Request, *args, **kwargs) -> Response:
        if "new_password" in request.data and "current_password" not in request.data:
            return Response(
                {
                    "message": "You must provide current password to set new one",
                    "code": "current_password_required",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif "new_password" in request.data and "current_password" in request.data:
            recommender = Recommender.objects.get(id=request.user.id)
            if not recommender.check_password(request.data.get("current_password")):
                return Response(
                    {
                        "message": "Provided password is incorrect",
                        "code": "incorrect_password",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request: Request, *args, **kwargs) -> Response:
        return self.destroy(request, *args, **kwargs)

    def get_serializer_class(self) -> ModelSerializer:
        user = self.get_object()
        if self.request.method == "PATCH" and "new_password" in self.request.data:
            if user.is_staff:
                return CompanyAdminNewPasswordSerializer
            return RecommenderNewPasswordSerializer
        elif self.request.method in ["PUT", "PATCH"]:
            if user.is_staff:
                return CompanyAdminUpdateSerializer
            return RecommenderUpdateSerializer
        return RecommenderSerializer

    def get_permissions(self) -> List[BasePermission]:
        if self.request.method == "POST":
            return []
        return [IsAuthenticated()]

    def get_object(self):
        user = self.request.user
        if user.is_staff:
            try:
                CompanyAdmin.objects.get(id=user.id)
            except CompanyAdmin.DoesNotExist:
                return user
        try:
            recommender = Recommender.objects.get(id=user.id)
            return recommender
        except Recommender.DoesNotExist:
            return user


class UserDetailsAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self) -> ModelSerializer:
        user = self.request.user
        if user.is_staff:
            return CompanyAdminDetailsSerializer
        return RecommenderDetailsSerializer

    def get_object(self) -> Union[Recommender, CompanyAdmin]:
        user = self.request.user
        if user.is_staff:
            return CompanyAdmin.objects.get(id=user.id)
        return Recommender.objects.get(id=user.id)

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return CompanyAdmin.objects.all()
        return Recommender.objects.all()

    def retrieve(self, request: Request, *args, **kwargs) -> Response:
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except (Recommender.DoesNotExist, CompanyAdmin.DoesNotExist):
            return Response(
                {
                    "message": "User not found",
                    "code": "user_not_found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
