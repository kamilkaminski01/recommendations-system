from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from recommenders.models import Recommender


class TestRecommenderUpdateAPIView(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.url = reverse("recommenders_api")
        self.recommender = Recommender.objects.create_user(
            email="mateusz@recommender.com",
            password="Mateusz-123",
            first_name="Mateusz",
            last_name="Nietupski",
        )
        refresh = RefreshToken.for_user(self.recommender)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

    def test_update_recommender_data(self):
        update_data = {"first_name": "Dimateos"}
        expected_output = {
            "email": "mateusz@recommender.com",
            "first_name": "Dimateos",
            "last_name": "Nietupski",
            "address": None,
        }

        response = self.client.patch(
            self.url,
            update_data,
            **self.auth_headers,
            content_type="application/json",
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(response.json(), expected_output)
