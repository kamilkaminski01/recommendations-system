from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Recommender
from .serializers import RecommenderSerializer


class RecommendersList(ListAPIView):
    model = Recommender
    serializer_class = RecommenderSerializer
    queryset = Recommender.objects.all()


class RecommendersAPIView(APIView):
    def get(self, request: Request) -> Response:
        query = Recommender.objects.all()
        serializer_class = RecommenderSerializer(query, many=True)
        return Response(serializer_class.data)

    def post(self, request: Request) -> Response:
        recommender_serialized = RecommenderSerializer(data=request.data)
        if recommender_serialized.is_valid(raise_exception=True):
            recommender = recommender_serialized.save()
            return Response(
                {
                    "Success": f"Recommender {recommender.first_name} "
                    f"{recommender.last_name} added successfully"
                }
            )
        return Response(
            recommender_serialized.errors, status=status.HTTP_400_BAD_REQUEST
        )

    def put(self, request: Request, pk: int) -> Response:
        recommender = Recommender.objects.get(id=pk)
        recommender_serialized = RecommenderSerializer(recommender, data=request.data)
        if recommender_serialized.is_valid(raise_exception=True):
            recommender = recommender_serialized.save()
            return Response(
                {
                    "Success": f"Recommender {recommender.first_name} "
                    f"{recommender.last_name} updated successfully"
                }
            )
        return Response(
            recommender_serialized.errors, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request: Request, pk: int) -> Response:
        Recommender.objects.filter(id=pk).delete()
        return Response(status=status.HTTP_200_OK)


class RecommenderDetailedAPIView(APIView):
    def get(self, request: Request, pk: int):
        query = Recommender.objects.filter(id=pk)
        serializer_class = RecommenderSerializer(query, many=True)
        return Response(serializer_class.data)
