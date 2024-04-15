import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';

//Setting up the scene and camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xADD8E6)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Setting up the renderer and adding it to the html page
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//Setting up the camera controls
const controls = new OrbitControls( camera, renderer.domElement )
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();

//Instantiating the geometry and material that each cube will have
const cube_geometry = new THREE.BoxGeometry(1, 1, 1);
const cube_material = new THREE.MeshBasicMaterial( { color: terrain_color_hex } );


// Create cube outline
var outlineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
var outlineGeometry = new THREE.EdgesGeometry(cube_geometry);

//Render the terrain using cubes
if (TERRAIN_CUBE) {
    let array_cubes = []
    //Adding an array of 10 cubes
        for (let i = 0; i < coords_matrix.length; i ++) {
        //Creating the cube mesh from the geometry and material
        const new_cube = new THREE.Mesh(cube_geometry, cube_material)
        //Assigning the cube position to its coordinates from the matrix
        //3js system is Y=UP ==> position.y takes Z
        new_cube.position.x = coords_matrix[i][0]
        new_cube.position.z = coords_matrix[i][1]
        //Coordinate affected by perlin noise
        new_cube.position.y = coords_matrix[i][2]*2
        //new_cube.position.z = 1
        
        //Adding the cube to the scene and the array
        scene.add( new_cube )
        array_cubes[i] = new_cube
        
        //Adding the outline
        var outline = new THREE.LineSegments(outlineGeometry, outlineMaterial);
        outline.renderOrder = 1;
        new_cube.add( outline )
    }

    //Set camera according to y=up orientation
    camera.position.x = 5;
    camera.position.y = 25;
    camera.position.z = 50;

} else {

    //Render the terrain using buffergeometry instead
    // Define vertices
    var vertices = [];

    for (let i = 0; i < coords_matrix.length; i++) {
        vertices.push(new THREE.Vector3(coords_matrix[i][0] - 1, coords_matrix[i][1] - 1, coords_matrix[i][2]*2))
    }

    let EDGE_SIZE = Math.sqrt(coords_matrix.length)

    //Define indices
    var indices = [];
    //Draw each square, for each row there are EDGE_SIZE - 1 squares, or EDGE_SIZE*2 - 2 triangles
    for (let j = 0; j < EDGE_SIZE-1; j++) {
        //For each row, draw the two triangles that make up the square
        for (let i = 0; i < EDGE_SIZE-1; i++) {
            //Bottom left triangle
            indices.push(i + j*EDGE_SIZE, i + j*EDGE_SIZE + 1, i + j*EDGE_SIZE + EDGE_SIZE)
            //Top right triangle
            indices.push(i + j*EDGE_SIZE + 1, i + j*EDGE_SIZE + EDGE_SIZE + 1, i + j*EDGE_SIZE + EDGE_SIZE)
        }
    }

    // Create a BufferGeometry
    var t_geometry = new THREE.BufferGeometry();

    // Add vertices to the geometry
    t_geometry.setFromPoints(vertices);

    // Add faces to the geometry
    t_geometry.setIndex(indices);

    // Create a material
    var material = new THREE.MeshBasicMaterial({ color: terrain_color_hex });
    // Create a mesh
    var mesh = new THREE.Mesh(t_geometry, material);

    // Add the mesh to the scene
    scene.add(mesh);

    //Outline
    var outlineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    var outlineGeometry = new THREE.EdgesGeometry(t_geometry);
    var outline = new THREE.LineSegments(outlineGeometry, outlineMaterial);
    outline.renderOrder = 1;
    mesh.add(outline)

    //Set camera according to z=up orientation
    camera.position.x = 0;
    camera.position.y = -35;
    camera.position.z = 30;
}

//Rendering the scene
function animate() {
	requestAnimationFrame( animate );
    controls.update();
	renderer.render( scene, camera );

    //console.log(`${camera.position.x};${camera.position.y};${camera.position.z}`)
}
animate();

//Get the polygon and vertex count of the scene
let totalVertices = 0;
let totalFaces = 0;

scene.traverse(function (object) {
    if (object instanceof THREE.Mesh && object.geometry) {
        const geo = object.geometry;
        if (geo.isGeometry) {
            totalVertices += geo.vertices.length;
            totalFaces += geo.faces.length;
        } else if (geo.isBufferGeometry) {
            const positionAttribute = geo.attributes.position;
            if (positionAttribute) {
                totalVertices += positionAttribute.count;
                totalFaces += geo.index ? geo.index.count / 3 : positionAttribute.count / 3;
            }
        }
    }
});

document.getElementById("label_vertexcount").textContent = `Total vertices: ${totalVertices}`
document.getElementById("label_facescount").textContent = `Total faces: ${totalFaces}`

//OBJ Downloader function
function DownloadOBJ() {
    // Instantiate an exporter
    const exporter = new OBJExporter();
    // Convert the scene to OBJ format
    const data = exporter.parse( scene );
    //Download the converted OBJ data
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', 'model.obj');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

window.DownloadOBJ = DownloadOBJ;
