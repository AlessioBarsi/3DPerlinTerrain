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
            print(round(distance, 2), " ", end="")
        print()


def getPerlinNoise():
    return 0

def getPerlinNoise(octaves, seed):
    from perlin_noise import PerlinNoise
    return PerlinNoise(octaves, seed)

def getHeightFunction(f, x, y, height, max_height):
    import math
    distance = math.sqrt( (height/2 - x)**2 + (height/2 - y)**2 )
    if f == 'linear':
        if distance == 0:
            return 0
        else:
            if 1/distance > max_height:
                #return max_height
                return 1/distance
            else:
                return 1/distance
    else: 
        return 0
    


if __name__ == "__main__":
    main()