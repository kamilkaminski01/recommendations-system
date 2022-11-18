from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from .models import Recommender
from .serializers import RecommenderSerializer


class RecommendersList(ListAPIView):
    model = Recommender
    serializer_class = RecommenderSerializer
    queryset = Recommender.objects.all()
