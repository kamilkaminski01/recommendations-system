from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from advertisements.models import Advertisement
from candidates.models import Candidate
from companies.models import CompanyAdmin
from recommenders.models import Recommender


class TestCandidateUpdateAPIView(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.url = reverse("candidates_update", kwargs={"pk": 1})
        self.company_admin = CompanyAdmin.objects.create(
            email="jarek@trivago.com",
            password="Jarek-123",
            first_name="Jarek",
            last_name="Kowalski",
            company="Trivago",
        )
        self.recommender = Recommender.objects.create(
            first_name="Kamil",
            last_name="Recommender",
            email="kamil@recommender.com",
            password="Admin-123",
        )
        self.advertisement = Advertisement.objects.create(
            company=self.company_admin,
            title="Ubezpieczenie na wakacje",
            type="COMMERCIAL",
            reward_for_approval=500,
        )
        self.candidate = Candidate.objects.create(
            id=1,
            referrer=self.recommender,
            first_name="Adam",
            last_name="Malysz",
            email="adam@candidate.com",
            advertisement=self.advertisement,
            status=Candidate.StatusChoices.INVITED,
        )
        refresh = RefreshToken.for_user(self.company_admin)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

    def test_update_candidate_status(self):
        update_data = {"status": Candidate.StatusChoices.CONFIRMED}
        expected_output = {"status": "confirmed"}

        response = self.client.put(
            self.url,
            update_data,
            **self.auth_headers,
            content_type="application/json",
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(response.json(), expected_output)
        self.recommender.refresh_from_db()
        self.assertEqual(self.recommender.current_points, 500)
        self.assertEqual(self.recommender.credibility, 100)
