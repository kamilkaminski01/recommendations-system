from rest_framework import generics, mixins
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Recommender
from .serializers import RecommenderSerializer


class RecommendersAPIView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):
    queryset = Recommender.objects.all()
    serializer_class = RecommenderSerializer

    def get(self, request: Request, *args, **kwargs) -> Response:
        return self.retrieve(request, *args, **kwargs)

    def put(self, request: Request, *args, **kwargs) -> Response:
        return self.update(request, *args, **kwargs)

    def post(self, request: Request, *args, **kwargs) -> Response:
        return self.create(request, *args, **kwargs)

    def delete(self, request: Request, *args, **kwargs) -> Response:
        return self.destroy(request, *args, **kwargs)


class RecommenderListAPIView(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = Recommender.objects.all()
    serializer_class = RecommenderSerializer

    def get(self, request: Request, *args, **kwargs) -> Response:
        return self.list(request, *args, **kwargs)
