from rest_framework import generics, mixins, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from .models import Recommender
from .serializers import (
    RecommenderDetailsSerializer,
    RecommenderNewPasswordSerializer,
    RecommenderSerializer,
    RecommenderUpdateSerializer,
)


class RecommenderListCreateAPIView(generics.ListCreateAPIView):
    queryset = Recommender.objects.all()

    def get(self, request: Request, *args, **kwargs) -> Response:
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs) -> Response:
        return self.create(request, *args, **kwargs)

    def get_serializer_class(self) -> ModelSerializer:
        if self.request.method == "POST":
            return RecommenderSerializer
        return RecommenderDetailsSerializer


class RecommenderDetailsAPIView(
    mixins.RetrieveModelMixin,
    generics.GenericAPIView,
):
    queryset = Recommender.objects.all()
    serializer_class = RecommenderDetailsSerializer

    def get(self, request: Request, *args, **kwargs) -> Response:
        return self.retrieve(request, *args, **kwargs)


class RecommenderUpdateAPIView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    generics.GenericAPIView,
):
    queryset = Recommender.objects.all()

    def get(self, request: Request, *args, **kwargs) -> Response:
        return self.retrieve(request, *args, **kwargs)

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

    def get_serializer_class(self) -> ModelSerializer:
        if self.request.method == "PATCH" and "new_password" in self.request.data:
            return RecommenderNewPasswordSerializer
        return RecommenderUpdateSerializer
