from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Vertex

def index(request):
    return HttpResponse("This is the index page of the terrain app")

def generator(request):
    template = loader.get_template('generator.html')
    return HttpResponse(template.render(request=request))
