import logging

from recommenders.models import Recommender

from .models import Candidate


def update_recommender_points(candidate: Candidate) -> None:
    if candidate.status == Candidate.StatusChoices.CONFIRMED:
        if candidate.referrer and candidate.advertisement:
            try:
                recommender = Recommender.objects.get(id=candidate.referrer.id)
                recommender.current_points += (
                    candidate.advertisement.reward_for_approval
                )
                recommender.credibility += 100
                recommender.save()
            except Recommender.DoesNotExist:
                logging.error("Recommender does not exist for candidate %s", candidate)
