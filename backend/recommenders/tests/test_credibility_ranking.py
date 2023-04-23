import json

from django.test import Client, TestCase
from django.urls import reverse

from recommenders.models import Recommender


class TestCredibilityRanking(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client = Client()
        self.url = reverse("recommenders_ranking")
        self.recommender1 = Recommender.objects.create_user(
            email="krzysiek@recommender.com",
            password="Krzysiek-123",
            first_name="Krzysiek",
            last_name="Nietupski",
            credibility=100,
        )
        self.recommender2 = Recommender.objects.create_user(
            email="mateusz@recommender.com",
            password="Mateusz-123",
            first_name="Mateusz",
            last_name="Jablonski",
            credibility=200,
        )

    def test_get_credibility_ranking(self):
        expected_output = [
            {"first_name": "Mateusz", "last_name": "Jablonski", "credibility": 200},
            {"first_name": "Krzysiek", "last_name": "Nietupski", "credibility": 100},
        ]
        response = self.client.get(self.url)
        response_data = json.loads(response.content)
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_output, response_data)
