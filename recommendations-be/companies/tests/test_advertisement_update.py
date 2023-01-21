import json

from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from companies.models import Advertisement, CompanyAdmin


class TestAdvertisementUpdate(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.url = reverse("advertisements_details", kwargs={"pk": 0})
        self.company_admin = CompanyAdmin.objects.create(
            email="kamil@microsoft.com",
            password="Admin-123",
            company="Microsoft",
        )
        self.advertisement = Advertisement.objects.create(
            id=0,
            company=self.company_admin,
            title="Insurance for life",
            description="We are offering a lifetime insurance",
            type="COMMERCIAL",
            reward_for_approval=200,
        )
        refresh = RefreshToken.for_user(self.company_admin)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

    def test_get_advertisement(self):
        response = self.client.get(self.url)
        self.assertEqual(200, response.status_code)

    def test_update_advertisement(self):
        update_data = {
            "title": "Updated insurance for life",
            "type": "COMMERCIAL",
            "reward_for_approval": 200,
        }
        expected_data = {
            "id": 0,
            "company": "Microsoft",
            "title": "Updated insurance for life",
            "description": "We are offering a lifetime insurance",
            "type": "COMMERCIAL",
            "reward_for_approval": 200,
        }
        response = self.client.put(
            self.url,
            update_data,
            **self.auth_headers,
            content_type="application/json",
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(response.json(), expected_data)

    def test_not_authenticated(self):
        response = self.client.put(self.url)
        self.assertEqual(401, response.status_code)
        response_data = json.loads(response.content)
        self.assertEqual(response_data.get("code"), "not_authenticated")
