from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from recommenders.models import Recommender

from .models import PurchaseHistory, Reward
from .serializers import (
    PurchaseHistoryCreateSerializer,
    PurchaseHistorySerializer,
    RewardDetailSerializer,
    RewardListSerializer,
)


class RewardListAPIView(ListAPIView):
    serializer_class = RewardListSerializer
    queryset = Reward.objects.all()


class RewardDetailAPIView(RetrieveAPIView):
    serializer_class = RewardDetailSerializer
    queryset = Reward.objects.all()


class PurchaseHistoryListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PurchaseHistorySerializer

    def get_queryset(self):
        recommender = Recommender.objects.get(pk=self.request.user.id)
        queryset = PurchaseHistory.objects.filter(recommender=recommender).order_by(
            "-purchase_date"
        )
        return queryset


class PurchaseHistoryCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PurchaseHistoryCreateSerializer
    queryset = PurchaseHistory.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer: PurchaseHistoryCreateSerializer) -> None:
        recommender = Recommender.objects.get(id=self.request.user.id)
        first_name = self.request.data.get("first_name")
        last_name = self.request.data.get("last_name")
        shipping_address = self.request.data.get("shipping_address")
        reward_id = self.request.data.get("reward")
        reward = Reward.objects.get(pk=reward_id)
        points_spent = Reward.objects.get(pk=reward_id).cost
        shipping_address = f"{first_name} {last_name}\n" f"{shipping_address}"
        serializer.save(
            recommender=recommender,
            reward=reward,
            points_spent=points_spent,
            shipping_address=shipping_address,
        )
        recommender.current_points -= points_spent
        recommender.save()
