import json

from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from companies.models import CompanyAdmin


class TestCreateAdvertisementAPIView(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.url = reverse("advertisements_list")
        self.company_admin = CompanyAdmin.objects.create_user(
            email="kamil@microsoft.com",
            password="Admin-123",
            company="Microsoft",
        )
        refresh = RefreshToken.for_user(self.company_admin)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

    def test_create_and_get_advertisement(self):
        advertisement_data = {
            "title": "Dev ops",
            "description": "We are hiring a dev ops",
            "type": "RECRUITMENT",
            "reward_for_approval": 100,
        }
        expected_data = [
            {
                "id": 1,
                "company": "Microsoft",
                "title": "Dev ops",
                "description": "We are hiring a dev ops",
                "type": "RECRUITMENT",
                "reward_for_approval": 100,
            }
        ]
        post_response = self.client.post(
            self.url, advertisement_data, **self.auth_headers
        )
        get_response = self.client.get(self.url)
        assert post_response.status_code == 201
        assert get_response.json() == expected_data

    def test_not_authenticated(self):
        response = self.client.post(self.url)
        self.assertEqual(401, response.status_code)
        response_data = json.loads(response.content)
        self.assertEqual(response_data.get("code"), "not_authenticated")
