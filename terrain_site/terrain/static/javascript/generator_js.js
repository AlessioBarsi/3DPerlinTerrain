import * as THREE from 'three';

console.log("Testing generator_js.js")

//Setting up the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Adding a cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;


//Adding a second cube
const geometry2 = new THREE.BoxGeometry(0.5, 5, 0.5);
const material2 = new THREE.MeshBasicMaterial( {color: 0x2596be} );
const cube2 = new THREE.Mesh(geometry2, material2);
scene.add( cube2);

camera.position.z = 5;

//Rendering the cube(s)
function animate() {

    //Rotating the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    //Rotating the 2nd cube
    cube2.rotation.x += 0.05;
    cube2.rotation.y += 0.05;
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();


