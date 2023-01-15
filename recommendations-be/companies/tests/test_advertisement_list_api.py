from django.test import Client, TestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from companies.models import Advertisement, CompanyAdmin


class TestCreateAdvertisementAPIView(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.url = reverse("advertisements_list")
        self.company_admin1 = CompanyAdmin.objects.create(
            email="kamil@microsoft.com",
            password="Admin-123",
            company="Microsoft",
        )
        self.company_admin2 = CompanyAdmin.objects.create(
            email="adam@apple.com",
            password="Admin-123",
            company="Apple",
        )
        self.company_admin3 = CompanyAdmin.objects.create(
            email="mateusz@amazon.com",
            password="Admin-123",
            company="Amazon",
        )
        self.add1, self.add2, self.add3 = Advertisement.objects.bulk_create(
            [
                Advertisement(
                    company=self.company_admin1,
                    title="Add1",
                    description="Test description",
                    type="COMMERCIAL",
                    reward_for_approval=200,
                ),
                Advertisement(
                    company=self.company_admin2,
                    title="Add2",
                    description="Test description",
                    type="RECRUITMENT",
                    reward_for_approval=150,
                ),
                Advertisement(
                    company=self.company_admin3,
                    title="Add3",
                    description="Test description",
                    type="COMMERCIAL",
                    reward_for_approval=300,
                ),
            ]
        )
        refresh = RefreshToken.for_user(self.company_admin1)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

    def test_list_advertisements(self):
        expected_output = [
            {
                "id": self.add1.id,
                "company": "Microsoft",
                "title": "Add1",
                "description": "Test description",
                "type": "COMMERCIAL",
                "reward_for_approval": 200,
            },
            {
                "id": self.add2.id,
                "company": "Apple",
                "title": "Add2",
                "description": "Test description",
                "type": "RECRUITMENT",
                "reward_for_approval": 150,
            },
            {
                "id": self.add3.id,
                "company": "Amazon",
                "title": "Add3",
                "description": "Test description",
                "type": "COMMERCIAL",
                "reward_for_approval": 300,
            },
        ]
        response = self.client.get(self.url, **self.auth_headers)
        assert response.status_code == 200
        assert response.json() == expected_output
