from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Reward
from .serializers import RewardDetailSerializer, RewardListSerializer


class RewardListAPIView(ListAPIView):
    serializer_class = RewardListSerializer
    ordering_fields = ["created_at"]
    queryset = Reward.objects.all()


class RewardDetailAPIView(RetrieveAPIView):
    serializer_class = RewardDetailSerializer
    queryset = Reward.objects.all()
