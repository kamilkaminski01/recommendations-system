import json

from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from recommenders.models import Recommender


class TestRecommenderGetAPIView(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.url = reverse("recommenders_api")
        self.recommender = Recommender.objects.create_user(
            email="krzysiek@recommender.com",
            password="Krzysiek-123",
            first_name="Krzysiek",
            last_name="Nietupski",
        )
        refresh = RefreshToken.for_user(self.recommender)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

    def test_get_recommender_data(self):
        expected_output = [
            {
                "email": "krzysiek@recommender.com",
                "first_name": "Krzysiek",
                "last_name": "Nietupski",
                "address": None,
                "current_points": 0,
                "credibility": 0,
            }
        ]
        response = self.client.get(self.url, **self.auth_headers)
        self.assertEqual(200, response.status_code)
        response_data = json.loads(response.content)
        self.assertEqual(expected_output, response_data)
