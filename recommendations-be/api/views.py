from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.list import ListView


def test_view(request):
    return HttpResponse("Test")
