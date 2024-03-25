from django.db import models

class Vertex(models.Model):
    x_coord = models.FloatField(default = 0)
    y_coord = models.FloatField(default = 0)
    z_coord = models.FloatField(default = 0)
    