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
    VERTEX_COUNT = 100
    HEIGHT_CURVE = 'Linear'
    MAX_HEIGHT = 1
    PERLIN_NOISE_ENABLED = True
    TERRAIN_COLOR = '0x00ff00'
    GEOMETRY_TYPE = True

    if request.method == 'POST':
        form = request.POST
        VERTEX_COUNT = int(form['input_terrain_size'])
        HEIGHT_CURVE = form['height_curve']

        #Check which geometry to use
        type_input = form['geometry_type']
        if(type_input == 'Cube'):
            GEOMETRY_TYPE = True
        else:
            GEOMETRY_TYPE = False

        #Check if the Perlin Noise has been enabled in the form
        if (request.POST.get('perlin_noise_checkbox') == 'on'):
            PERLIN_NOISE_ENABLED = True
        else:
            PERLIN_NOISE_ENABLED = False
        if (PERLIN_NOISE_ENABLED):
            OCTAVES = float(form['input_octaves'])
            SCALE = float(form['input_scale'])
        
        #Get the color string from the input form
        TERRAIN_COLOR = '0x' + form['input_color'][1:]

    #Delete existing vertices first
    vertices = Vertex.objects.all().values()    
    for v in Vertex.objects.all():
        v.delete()
    #Generate a set of new vertices
    if len(vertices) == 0:
        #Generate the perlin noise object with set octaves and seed
        from .functions import getHeightFunction

        #Triplicate vertex count if geometry type isn't set to cube
        if not(GEOMETRY_TYPE):
            VERTEX_COUNT *= 3

        for x in range(int(math.sqrt(VERTEX_COUNT))):
            for y in range(int(math.sqrt(VERTEX_COUNT))):
                #Z coordinate is defined by perlin_noise + eventual function to shape the terrain height
                #Generate Perlin Noise value if checkbox was enabled
                z_value = 1
                if (PERLIN_NOISE_ENABLED):
                    from .functions import getPerlinNoise
                    noise = getPerlinNoise(OCTAVES, 1)
                    z_value = noise([x / math.sqrt(VERTEX_COUNT) * SCALE, y / math.sqrt(VERTEX_COUNT) * SCALE])
                newVertex = Vertex.objects.create(x_coord = 1+y,
                                                  y_coord = 1+x,
                                                  z_coord = z_value
                                                          + getHeightFunction(HEIGHT_CURVE.lower(), x, y, math.sqrt(VERTEX_COUNT), MAX_HEIGHT) )

    context = {
        'vertices' : Vertex.objects.all().values(),
        'terrain_color': TERRAIN_COLOR,
        'terrain_type': GEOMETRY_TYPE,
    }
    template = loader.get_template('generator.html')
    return HttpResponse(template.render(context=context, request=request))
