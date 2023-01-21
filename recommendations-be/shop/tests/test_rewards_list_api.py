from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from recommenders.models import Recommender
from shop.models import Reward


class TestRewardsAPIView(TestCase):
    def setUp(self):
        super().setUp()
        self.client = Client()
        self.url = reverse("rewards")
        self.user = Recommender.objects.create_user(
            email="kamil@kaminski.com",
            first_name="Kamil",
            last_name="Kaminski",
            password="Kamil-123",
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

    def test_list_rewards(self):
        expected_output = [
            {
                "id": self.reward1.id,
                "title": "Reward1",
                "cost": 100,
                "short_description": "test",
                "type": "PHYSICAL",
                "image": None,
            },
            {
                "id": self.reward2.id,
                "title": "Reward2",
                "cost": 200,
                "short_description": "test",
                "type": "DIGITAL",
                "image": None,
            },
            {
                "id": self.reward3.id,
                "title": "Reward3",
                "cost": 300,
                "short_description": "test",
                "type": "PHYSICAL",
                "image": None,
            },
        ]
        response = self.client.get(self.url, **self.auth_headers)
        assert response.status_code == 200
        assert response.json() == expected_output
