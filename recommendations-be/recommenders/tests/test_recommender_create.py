from django.test import Client, TestCase
from django.urls import reverse

from recommenders.models import Recommender


class TestRecommenderRegistrationAPIView(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.url = reverse("users_api")
        self.recommender = Recommender.objects.create_user(
            email="janusz@recommender.com",
            password="Janusz-123",
        )

    def test_create_recommender(self):
        user_data = {
            "email": "kamil@user.com",
            "password": "Kamil-123",
            "first_name": "Kamil",
            "last_name": "Kaminski",
        }
        response = self.client.post(self.url, user_data)
        assert response.status_code == 201
        created_recommender = Recommender.objects.get(email="kamil@user.com")
        assert created_recommender is not None

    def test_required_fields(self):
        user_data = {}
        response = self.client.post(self.url, user_data)
        assert response.status_code == 400
        assert response.json().get("email")[0].get("code") == "required"
        assert response.json().get("first_name")[0].get("code") == "required"
        assert response.json().get("last_name")[0].get("code") == "required"
        assert response.json().get("password")[0].get("code") == "required"

    def test_email_already_exists(self):
        user_data = {
            "email": "janusz@recommender.com",
            "password": "Janusz-123",
        }
        response = self.client.post(self.url, user_data)
        assert response.status_code == 400
        assert response.json().get("email")[0].get("code") == "unique"
