def main():
    noise = getPerlinNoise(10, 1)

    scale = 0.1
    width = 10
    height = 10

    import os
    os.system('cls')

    grid = [ [noise([x / width * scale, y / height * scale]) for y in range(height) ] for x in range(width)]
    print(grid)

def getPerlinNoise():
    return 0

def getPerlinNoise(octaves, seed):
    from perlin_noise import PerlinNoise
    return PerlinNoise(octaves, seed)

if __name__ == "__main__":
    main()