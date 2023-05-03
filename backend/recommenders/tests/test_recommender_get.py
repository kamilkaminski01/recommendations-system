import json

from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from recommenders.models import Recommender


class TestRecommenderGetAPIView(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.client_detail = Client()
        self.url = reverse("users_api")
        self.url_detail = reverse("user_details")
        self.recommender = Recommender.objects.create_user(
            email="krzysiek@recommender.com",
            password="Krzysiek-123",
            first_name="Krzysiek",
            last_name="Nietupski",
        )
        self.detailed_recommender = Recommender.objects.create_user(
            email="mateusz@jablonski.com",
            password="Mateusz-123",
            first_name="Mateusz",
            last_name="Jablonski",
            address="ul. Sienkiewicza 3",
            current_points=200,
            credibility=500,
        )
        refresh = RefreshToken.for_user(self.recommender)
        refresh_detailed = RefreshToken.for_user(self.detailed_recommender)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}
        self.auth_headers_details = {
            "HTTP_AUTHORIZATION": f"Bearer {refresh_detailed.access_token}"
        }

    def test_get_recommender_data(self):
        expected_output = {
            "email": "krzysiek@recommender.com",
            "first_name": "Krzysiek",
            "last_name": "Nietupski",
        }
        response = self.client.get(self.url, **self.auth_headers)
        response_data = json.loads(response.content)
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_output, response_data)

    def test_get_detailed_recommender_data(self):
        expected_output = {
            "email": "mateusz@jablonski.com",
            "first_name": "Mateusz",
            "last_name": "Jablonski",
            "address": "ul. Sienkiewicza 3",
            "current_points": 200,
            "credibility": 500,
            "is_staff": False,
        }
        response = self.client.get(self.url_detail, **self.auth_headers_details)
        response_data = json.loads(response.content)
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_output, response_data)
