def main():
    my_noise = getPerlinNoise(10, 1)

    scale = 0.1
    width = 10
    height = 10

    import os
    os.system('cls')
    import math
    for x in range(1, height):
        print('Row number#',x)
        for y in range(1, height):
            
            #Linear distance
            distance = math.sqrt(((height/2 - x))**2 + ((height/2 - y))**2)
            if (distance != 0):
                z = 1/distance
            else:
                z = 0
            print(round(z, 2), " ", end="")
        print()


def getPerlinNoise():
    return 0

def getPerlinNoise(octaves, seed):
    from perlin_noise import PerlinNoise
    return PerlinNoise(octaves, seed)

def getHeightFunction(f, x, y, height, max_height):
    import math
    distance = math.sqrt( (height/2 - x)**2 + (height/2 - y)**2 )
    #The height is scaled by a factor to make the increase more prominent
    match f:
        #Linear function, y = x -> The terrain has a gentle increase in height the closer it is to the center
        case 'linear':
            FACTOR = 3
            value = 1 - (distance / (height / 2))
            return value * FACTOR
        #Exponential function, y = e^x -> The terrain has a steep increase the closer it is to the center
        case 'exponential':
            FACTOR = 5
            value = math.exp(-FACTOR * distance / (height / 2))*2
            return value
        #Logarithmic function, y = log(x) -> The terrain has a steep increase towards its edges and then a more linear increase
        case 'logarithmic':
            value = math.log(distance / (height / 2), 2)
            return value
        #Costant function, y = 0 -> The terrain is flat
        case _:
            return 0

if __name__ == "__main__":
    main()