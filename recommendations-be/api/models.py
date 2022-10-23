from django.db import models


class Recommender(models.Model):
    f_name = models.CharField(max_length=50)
    l_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    passwd = models.CharField(max_length=50)
    age = models.IntegerField()
    current_points = models.IntegerField()
    credibility = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
