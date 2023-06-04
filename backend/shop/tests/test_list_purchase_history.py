from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from recommenders.models import Recommender
from shop.models import PurchaseHistory, Reward


class TestPurchaseHistoryListAPI(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.url = reverse("purchase_history")
        self.client = APIClient()
        self.user = Recommender.objects.create(
            email="user@user.com",
            password="password",
            current_points=200,
        )
        refresh = RefreshToken.for_user(self.user)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}
        self.reward1, self.reward2, self.reward3 = Reward.objects.bulk_create(
            [
                Reward(
                    title="Reward1",
                    cost=100,
                    short_description="test",
                    type=Reward.TypeChoices.PHYSICAL,
                ),
                Reward(
                    title="Reward2",
                    cost=200,
                    short_description="test",
                    type=Reward.TypeChoices.DIGITAL,
                ),
                Reward(
                    title="Reward3",
                    cost=300,
                    short_description="test",
                    type=Reward.TypeChoices.PHYSICAL,
                ),
            ]
        )
        PurchaseHistory.objects.bulk_create(
            [
                PurchaseHistory(
                    recommender=self.user,
                    reward=self.reward1,
                    points_spent=150,
                ),
                PurchaseHistory(
                    recommender=self.user,
                    reward=self.reward2,
                    points_spent=100,
                ),
                PurchaseHistory(
                    recommender=self.user,
                    reward=self.reward3,
                    points_spent=50,
                ),
            ]
        )

    def test_get_purchase_history_list(self):
        response = self.client.get(self.url, **self.auth_headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]["reward"]["title"], "Reward3")

    def test_get_purchase_history_list_unauthenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
