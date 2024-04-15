# 3DPerlinTerrain
A Django web app that shows the Perlin Noise algorithm applied to the generation of a 3D terrain trough the three.js library. The 3D model of the generated terrain can be downladed in OBj format.

## Terrain customization
* Perlin Noise: octaves and scale can be adjusted. The Perlin Noise can also be toggled on/off if desired.
* Terrain height: the general height curve of the terrain, defined by a mathematical function
* Terrain Geometry: the geometry used for generating the terrain. *Cube* will generate a single cube for each vertex, while *Normal mesh* will draw a mesh using triangles generated from the vertices
* Terrain Size: Overall size of the terrain grid. The terrain is a square grid, with the size determining its total number of cubes when *Cube* is set for the terrain geometry, or the approximated number of triangles otherwise. This value is multiplied by 3 in case terrain geometry isn't set to *Cube*
* Color: RGB color of the generated terrain mesh

## Screenshots 
<details>
  
</details>

## How to run the app
This app has been tested on Python 3.11.9

1) Clone this repository either trough github desktop, or by command line with
  ```
  git clone https://github.com/AlessioBarsi/3DPerlinTerrain.git
  ```
2) Navigate the cloned repository
  ```
  cd 3DPerlinTerrain.git
  ```
3) Create the virtual env
  ```
  python3 -m venv .venv
  ```
4) Activate the virtual env

  * macOS / Linux
  ```sh
  source .venv/bin/activate
  ```

  * Windows Powershell

  ```powershell
  .venv\Scripts\Activate.ps1
  ```

  * Windows Git Bash
  
  ```sh
  source .venv/Scripts/activate
  ```
5) Install the required packages
  ```
  pip install -r requirements.txt
  ```
6) Navigate to the application folder and run the server
  ```
  cd terrain_site

  python manage.py runserver
  ```
7) Open the page http://127.0.0.1:8000/terrain/generator in your local browser
