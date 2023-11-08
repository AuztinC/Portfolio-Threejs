import './style.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'


const scene = new THREE.Scene()
const canvas = document.querySelector('#hero-bg')

const heroRenderer = new THREE.WebGLRenderer({canvas})
heroRenderer.shadowMap.enabled = true
heroRenderer.shadowMap.type = THREE.PCFSoftShadowMap

const camera = new THREE.PerspectiveCamera( 50, 400 / 400, 0.1, 1000 )

const logo_dist = -30

window.addEventListener('resize', ()=>{
  // heroRenderer.setSize( window.innerWidth, 10)
  camera.aspect = 400 / 400
  camera.updateProjectionMatrix()
})
let X_AXIS = new THREE.Vector3( 1, 0, 0 );
let Y_AXIS = new THREE.Vector3( 0, 1, 0 );
let Z_AXIS = new THREE.Vector3( 0, 0, 1 );
var mouseTolerance = 0.01;
window.addEventListener('mousemove', (ev)=>{

  var centerX = window.innerWidth * 0.5;
  var centerY = window.innerHeight * 0.5;

  camera.position.x = ((ev.clientX - centerX) * mouseTolerance) ;
  camera.position.y = ((ev.clientY - centerY) * mouseTolerance) ;

})
heroRenderer.setPixelRatio( window.devicePixelRatio )
heroRenderer.setSize( 300, 300 )
camera.position.setZ(1.5)

const stlLoader = new STLLoader()
const gltfLoader = new GLTFLoader()

// stlLoader.load(
//   './obj/2-small.stl',
//   function ( stl ) {
//     const mesh = new THREE.Mesh(stl, material)
//     mesh.position.x = 0
//     mesh.position.y = 0
//     mesh.position.z = -10
//     mesh.rotateOnAxis(0,0,0, 90)
//     scene.add( mesh )
    
//   },
  
//   function ( xhr ) {
// 		console.log( (xhr.loaded / xhr.total * 100) + '% loaded cat' );
// 	},

// 	// onError callback
// 	function ( err ) {
// 		console.error( 'An error happened', err );
// 	}
// )

// ---- LOAD SKATE BOARD ---- 
let html_logo = new THREE.Object3D
gltfLoader.load(
  './obj/html_logo/scene.gltf',
  function ( gltf ) {
    const model = gltf.scene
    model.position.set( 7, -1, logo_dist )
    model.scale.set( .05, .05, .05)
    model.castShadow = true
    gltf.scene.traverse( function( node ) {

      if ( node.isMesh ) { node.castShadow = true; }

  } );
    scene.add( model )
    html_logo = model
  },
  
  function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened', err );
	}
)
let css_logo = new THREE.Object3D
gltfLoader.load(
  './obj/css_logo/scene.gltf',
  function ( gltf ) {
    const model = gltf.scene
    model.position.set( -7, -1, logo_dist )
    model.scale.set( .05, .05, .05)
    model.castShadow = true
    gltf.scene.traverse( function( node ) {

      if ( node.isMesh ) { node.castShadow = true; }

  } );
    scene.add( model )
    html_logo = model
  },
  
  function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened', err );
	}
)
let react_logo = new THREE.Object3D
gltfLoader.load(
  './obj/react_logo_circle/scene.gltf',
  function ( gltf ) {
    const model = gltf.scene
    model.position.set( -8.5, -3, logo_dist)
    model.scale.set( 1.8, 1.8, 1.8)
    model.castShadow = true
    gltf.scene.traverse( function( node ) {

      if ( node.isMesh ) { node.castShadow = true; }

  } );
    scene.add( model )
    react_logo = model
  },
  
  function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened', err );
	}
)
// ---- LOAD JS LOGO ---- //
let javascript_logo = new THREE.Object3D
gltfLoader.load(
  './obj/javascript_1/scene.gltf',
  
  function ( gltf ) {
    const model = gltf.scene
    model.position.set( 0, 0, logo_dist - 5 )
    model.scale.set( 2, 2, 2)
    model.rotation.x = 1.6
    model.rotation.y = 1.5555
    // model.rotateOnAxis(0,0,0)
    model.receiveShadow = true;
    javascript_logo = model
    gltf.scene.traverse( function( node ) {

      if ( node.isMesh ) { node.receiveShadow = true; }

  } );
    scene.add( model )
  },
  
  function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened', err );
	}
)

const directionalLight = new THREE.PointLight(0xffffcc, 100, 1000, 1)
directionalLight.position.set(5,15,5)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2000; // default
directionalLight.shadow.mapSize.height = 2000; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500; // default
scene.add(directionalLight)

// const controls = new OrbitControls(camera, heroRenderer.domElement)

function animate(){
  requestAnimationFrame( animate )
  camera.lookAt( javascript_logo.position );
  react_logo.rotateOnAxis( Z_AXIS, 0.003 );
  // controls.update()
  heroRenderer.render(scene, camera)
}
animate()