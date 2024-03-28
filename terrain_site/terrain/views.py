from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Vertex

def index(request):
    return HttpResponse("This is the index page of the terrain app")

def generator(request):

    #Generate a sample of 9 vertices with perlin noise
    vertices = Vertex.objects.all().values()    
    for v in Vertex.objects.all():
        v.delete()

    if len(vertices) == 0:
        
        from .functions import getPerlinNoise
        noise = getPerlinNoise(10, 1)
        for j in range(3):
            for i in range(3):
                newVertex = Vertex.objects.create(x_coord = 1+i, y_coord = 1+j, z_coord = noise( ((i*j)+1)/100 ) )


    context = {
        'vertices' : Vertex.objects.all().values(),
    }
    template = loader.get_template('generator.html')
    return HttpResponse(template.render(context=context, request=request))
