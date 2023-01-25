import json

from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from companies.models import CompanyAdmin


class TestCompanyAdminUpdateAPIView(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.url = reverse("users_api")
        self.company_admin = CompanyAdmin.objects.create_user(
            email="bartek@zeto.pl",
            password="Bartek-123",
            first_name="Bartek",
            last_name="Jablonski",
            company="Zeto",
        )
        refresh = RefreshToken.for_user(self.company_admin)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

    def test_update_recommender_data(self):
        update_data = {"first_name": "Kamil"}
        expected_output = {
            "email": "bartek@zeto.pl",
            "first_name": "Kamil",
            "last_name": "Jablonski",
        }

        response = self.client.patch(
            self.url,
            update_data,
            **self.auth_headers,
            content_type="application/json",
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(response.json(), expected_output)

    def test_not_authenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(401, response.status_code)
        response_data = json.loads(response.content)
        self.assertEqual(response_data.get("code"), "not_authenticated")
