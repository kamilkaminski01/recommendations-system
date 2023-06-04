from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from recommenders.models import Recommender
from shop.models import Reward


class TestPurchaseHistoryCreateAPI(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.url = reverse("buy_reward")
        self.client = APIClient()
        self.user = Recommender.objects.create_user(
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

    def test_purchase(self):
        data = {
            "reward": self.reward1.id,
            "first_name": "Kamil",
            "last_name": "Kowalski",
            "shipping_address": "Bialystok",
        }
        expected_data = {"reward": self.reward1.id}
        expected_data["shipping_address"] = "Kamil Kowalski\n" "Bialystok"
        response = self.client.post(self.url, data, **self.auth_headers)
        points_before_purchase = self.user.current_points
        self.user.refresh_from_db()
        assert response.json() == expected_data
        assert response.status_code == 201
        assert self.user.current_points == points_before_purchase - self.reward1.cost

    def test_not_enough_points(self):
        data = {
            "reward": self.reward1.id,
            "first_name": "Kamil",
            "last_name": "Kowalski",
            "shipping_address": "Bialystok",
        }
        self.user.current_points = 0
        self.user.save()
        response = self.client.post(self.url, data, **self.auth_headers)
        assert (
            response.json().get("non_field_errors")[0].get("code")
            == "not_enough_points"
        )
        assert response.status_code == 400
