from rest_framework import generics, mixins
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from .models import Recommender
from .serializers import (
    RecommenderDetailsSerializer,
    RecommenderSerializer,
    RecommenderUpdateSerializer,
)


class RecommenderListCreateAPIView(generics.ListCreateAPIView):
    queryset = Recommender.objects.all()

    def get(self, request: Request, *args, **kwargs) -> Response:
        return self.list(request, *args, **kwargs)

    def perform_create(self, serializer: RecommenderSerializer):
        serializer.save()

    def get_serializer_class(self) -> ModelSerializer:
        if self.request.method in ["POST"]:
            return RecommenderSerializer
        return RecommenderDetailsSerializer


class RecommenderDetailsAPIView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):
    queryset = Recommender.objects.all()
    serializer_class = RecommenderDetailsSerializer

    def get(self, request: Request, *args, **kwargs) -> Response:
        return self.retrieve(request, *args, **kwargs)

    def delete(self, request: Request, *args, **kwargs) -> Response:
        return self.destroy(request, *args, **kwargs)


class RecommenderUpdateAPIView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    generics.GenericAPIView,
):
    queryset = Recommender.objects.all()
    serializer_class = RecommenderUpdateSerializer

    def get(self, request: Request, *args, **kwargs) -> Response:
        return self.retrieve(request, *args, **kwargs)

    def put(self, request: Request, *args, **kwargs) -> Response:
        return self.update(request, *args, **kwargs)
