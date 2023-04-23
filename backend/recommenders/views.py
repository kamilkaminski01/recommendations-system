from rest_framework import generics

from .models import Recommender
from .serializers import RecommenderCredibilitySerializer


class RecommenderCredibilityView(generics.ListAPIView):
    serializer_class = RecommenderCredibilitySerializer
    queryset = Recommender.objects.order_by("-credibility")
