import json

from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from advertisements.models import Advertisement
from candidates.models import Candidate
from companies.models import CompanyAdmin
from recommenders.models import Recommender


class TestCreateCandidateAPIView(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.url = reverse("advertisements_details", kwargs={"pk": 1})
        self.company_admin = CompanyAdmin.objects.create(
            email="adam@microsoft.com",
            password="Admin-123",
            company="Microsoft",
        )
        self.recommender = Recommender.objects.create_user(
            first_name="Kamil",
            last_name="Recommender",
            email="kamil@recommender.com",
            password="Admin-123",
        )
        self.advertisement = Advertisement.objects.create(
            id=1,
            company=self.company_admin,
            title="Backend developer",
            description="Code for us",
            type="RECRUITMENT",
            reward_for_approval=100,
        )
        refresh = RefreshToken.for_user(self.recommender)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

    def test_create_candidate(self):
        candidate_data = {
            "first_name": "Tester",
            "last_name": "Candidate",
            "email": "tester@candidate.com",
        }
        expected_data = {
            "first_name": "Tester",
            "last_name": "Candidate",
            "email": "tester@candidate.com",
        }
        response = self.client.post(self.url, candidate_data, **self.auth_headers)
        created_candidate = Candidate.objects.get(first_name="Tester")
        self.assertEqual(201, response.status_code)
        self.assertEqual(response.json(), expected_data)
        self.assertEqual(created_candidate.referrer, self.recommender)
        self.assertEqual(created_candidate.advertisement, self.advertisement)
        self.assertEqual(created_candidate.advertisement_name, "Backend developer")

    def test_not_authenticated(self):
        response = self.client.post(self.url)
        self.assertEqual(401, response.status_code)
        response_data = json.loads(response.content)
        self.assertEqual(response_data.get("code"), "not_authenticated")
