def main():
    noise = getPerlinNoise(10, 1)
    size = 100
    for i in range(3):
        for j in range(3):
            print(noise((i*j+1)/size,))

def getPerlinNoise():
    return 0


def getPerlinNoise(octaves, seed):
    from perlin_noise import PerlinNoise
    return PerlinNoise(octaves, seed)


if __name__ == "__main__":
    main()