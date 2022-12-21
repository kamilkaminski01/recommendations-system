from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from recommenders.models import Recommender


class TestRecommenderDeleteAPIView(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.url = reverse("recommenders_api")
        self.recommender = Recommender.objects.create_user(
            email="kamil@recommender.com",
            password="Kamil-123",
            first_name="Kamil",
            last_name="Jablonski",
        )
        refresh = RefreshToken.for_user(self.recommender)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

    def test_delete_recommender(self):
        response = self.client.delete(self.url, **self.auth_headers)
        self.assertEqual(204, response.status_code)
