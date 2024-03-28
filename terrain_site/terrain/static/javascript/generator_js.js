import * as THREE from 'three';

console.log("Testing generator_js.js")
const parametro = localStorage.getItem("Test_Param")
console.log(parametro)


//Setting up the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Instantiating the geometry and material that each cube will have
const cube_geometry = new THREE.BoxGeometry(1, 1, 1);
const cube_material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

let array_cubes = []
//Adding an array of 10 cubes
for (let i = 0; i < 9; i ++) {
    //Creating the cube mesh from the geometry and material
    const new_cube = new THREE.Mesh(cube_geometry, cube_material)
    //Adjusting the position
    new_cube.position.x = 1 + i
    new_cube.position.y = 1
    new_cube.position.z = 1
    //Adding the cube to the scene and the array
    scene.add( new_cube )
    array_cubes[i] = new_cube
}
camera.position.z = 5;

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

    //Rotating all cubes in the array
    array_cubes.forEach(c => {
        c.rotation.x += 0.02
        c.rotation.y += 0.02
    });

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
