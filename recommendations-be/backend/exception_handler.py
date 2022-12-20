import logging

from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.views import exception_handler

from recommenders.models import Recommender

exceptions_data = {
    Recommender.DoesNotExist: {
        "data": {
            "message": "You must be a Recommender to perform this action",
            "code": "recommender_not_found",
        },
        "status": status.HTTP_404_NOT_FOUND,
    },
}


def full_details_exception_handler(exc, context):
    """
    This overrides the default exception handler to include the human-readable
    message AND the error code so that clients can respond programmatically.
    """

    if isinstance(exc, APIException):
        exc.detail = exc.get_full_details()

    exception_class_type = exc.__class__
    if exception_class_type in exceptions_data.keys():
        logging.error(f"Original error detail and callstack: {exc}")
        return Response(
            exceptions_data[exception_class_type]["data"],
            status=exceptions_data[exception_class_type]["status"],
        )

    return exception_handler(exc, context)
