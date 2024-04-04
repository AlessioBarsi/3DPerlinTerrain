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
    max_distance = height*math.sqrt(2)
    distance = math.sqrt( (height/2 - x)**2 + (height/2 - y)**2 )
    #Linear function, y = x -> The terrain has a mountain shaped height
    match f:
        case 'linear':
            value = (max_distance - abs(distance))/height
            if value < 0:
                return 0
            else: 
                return value
                
        case 'costant':
            return 0

if __name__ == "__main__":
    main()