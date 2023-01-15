import json

from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from recommenders.models import Recommender


class TestRecommenderAuthentication(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.url = reverse("recommenders_api")
        self.recommender = Recommender.objects.create_user(
            email="mateusz@recommender.com",
            password="Mateusz-123",
        )
        refresh = RefreshToken.for_user(self.recommender)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

    def test_not_authenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(401, response.status_code)
        response_data = json.loads(response.content)
        self.assertEqual(response_data.get("code"), "not_authenticated")
