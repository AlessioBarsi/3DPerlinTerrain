from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Vertex

def index(request):
    return HttpResponse("This is the index page of the terrain app")

def generator(request):

    #It should be a perfect cube
    VERTEX_COUNT = 1000
    #Generate a sample of vertices with perlin noise
    #Delete old vertices first
    vertices = Vertex.objects.all().values()    
    for v in Vertex.objects.all():
        v.delete()
    #Generate a set of new ones
    if len(vertices) == 0:
        from .functions import getPerlinNoise
        noise = getPerlinNoise(10, 1)
        import math
        for j in range(int(math.sqrt(VERTEX_COUNT))):
            for i in range(int(math.sqrt(VERTEX_COUNT))):
                newVertex = Vertex.objects.create(x_coord = 1+i, y_coord = 1+j, z_coord = noise( ((i*j)+1)/200 ) )

    context = {
        'vertices' : Vertex.objects.all().values(),
        'test_var' : 'Testing Var Passed from context',
    }
    template = loader.get_template('generator.html')
    return HttpResponse(template.render(context=context, request=request))
