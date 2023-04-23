import json

from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from companies.models import CompanyAdmin


class TestDeleteCompanyAdminAPIView(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.url = reverse("users_api")
        self.company_admin = CompanyAdmin.objects.create_user(
            email="filip@zeto.sa",
            password="Filip-123",
            first_name="Filip",
            last_name="Tester",
            company="Zeto",
        )
        refresh = RefreshToken.for_user(self.company_admin)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

    def test_delete_recommender(self):
        response = self.client.delete(self.url, **self.auth_headers)
        self.assertEqual(204, response.status_code)

    def test_not_authenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(401, response.status_code)
        response_data = json.loads(response.content)
        self.assertEqual(response_data.get("code"), "not_authenticated")
