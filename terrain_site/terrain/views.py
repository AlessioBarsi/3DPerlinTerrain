from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Vertex
import math

def index(request):
    return HttpResponse("This is the index page of the terrain app")

def generator(request):


    #Get perlin_noise and terrain settings from html form
    SCALE = 0.1
    OCTAVES = 30
    VERTEX_COUNT = 1000
    HEIGHT_CURVE = 'Linear'
    MAX_HEIGHT = 1

    if request.method == 'POST':
        form = request.POST
        SCALE = float(form['input_scale'])
        VERTEX_COUNT = int(form['input_terrain_size'])
        OCTAVES = float(form['input_octaves'])
        HEIGHT_CURVE = form['height_curve']
        
    #Delete existing vertices first
    vertices = Vertex.objects.all().values()    
    for v in Vertex.objects.all():
        v.delete()
    #Generate a set of new vertices
    if len(vertices) == 0:
        #Generate the perlin noise object with set octaves and seed
        from .functions import getPerlinNoise
        noise = getPerlinNoise(OCTAVES, 1)
        from .functions import getHeightFunction

        for x in range(int(math.sqrt(VERTEX_COUNT))):
            for y in range(int(math.sqrt(VERTEX_COUNT))):
                #Z coordinate is defined by perlin_noise + eventual function to shape the terrain height
                newVertex = Vertex.objects.create(x_coord = 1+y,
                                                y_coord = 1+x,
                                                z_coord = noise([x / math.sqrt(VERTEX_COUNT) * SCALE, y / math.sqrt(VERTEX_COUNT) * SCALE])
                                                                + getHeightFunction(HEIGHT_CURVE.lower(), x, y, math.sqrt(VERTEX_COUNT), MAX_HEIGHT) )

    context = {
        'vertices' : Vertex.objects.all().values(),
    }
    template = loader.get_template('generator.html')
    return HttpResponse(template.render(context=context, request=request))
