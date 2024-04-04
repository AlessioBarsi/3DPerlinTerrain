import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

console.log("Testing generator_js.js")
//console.log(coords_matrix)

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
const cube_material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );


// Create cube outline
var outlineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
var outlineGeometry = new THREE.EdgesGeometry(cube_geometry);


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
camera.position.z = 10;

//Buffer Geometry code example that draws a square mesh
const geometry = new THREE.BufferGeometry();

// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array( [
	-1.0, -1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  1.0,  1.0, // v2

	 1.0,  1.0,  1.0, // v3
	-1.0,  1.0,  1.0, // v4
	-1.0, -1.0,  1.0  // v5
] );

// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const mesh = new THREE.Mesh( geometry, material );

scene.add( mesh )

//Rendering the scene
function animate() {

	requestAnimationFrame( animate );
    controls.update();
	renderer.render( scene, camera );
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

console.log("Total Vertices: ", totalVertices);
console.log("Total Faces: ", totalFaces);
