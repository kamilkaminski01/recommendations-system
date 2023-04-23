import json

from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from companies.models import CompanyAdmin


class TestCompanyAdminGetAPIView(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.client_detail = Client()
        self.url_detail = reverse("user_details", kwargs={"pk": 0})
        self.detailed_company_admin = CompanyAdmin.objects.create_user(
            email="krzysiek@uwb.pl",
            password="Krzysiek-123",
            first_name="Krzysztof",
            last_name="Uniwersytet",
            company="UWB",
        )
        refresh = RefreshToken.for_user(self.detailed_company_admin)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

    def test_get_detailed_company_admin_data(self):
        expected_output = {
            "email": "krzysiek@uwb.pl",
            "first_name": "Krzysztof",
            "last_name": "Uniwersytet",
            "company": "UWB",
            "is_staff": True,
        }
        response = self.client.get(self.url_detail, **self.auth_headers)
        response_data = json.loads(response.content)
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_output, response_data)

    def test_not_authenticated(self):
        response = self.client.get(self.url_detail)
        self.assertEqual(401, response.status_code)
        response_data = json.loads(response.content)
        self.assertEqual(response_data.get("code"), "not_authenticated")
