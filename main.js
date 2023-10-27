import './style.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

window.addEventListener('resize', ()=>{
  renderer.setSize( window.innerWidth, window.innerHeight )
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )
camera.position.setZ(10)
camera.position.setY(10)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry( 5, 1, 16, 100 )
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } )
const torus = new THREE.Mesh( geometry, material )
// scene.add(torus)

const loader = new GLTFLoader()
// ---- LOAD SKATE BOARD ---- //
let skateboard = new THREE.Object3D
loader.load(
  './obj/skateboard_01/scene.gltf',
  function ( gltf ) {
    const model = gltf.scene
    model.position.set( 0, 5, 0 )
    model.scale.set( .6, .6, .6)
    scene.add( model )
    skateboard = model
  },
  
  function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened', err );
	}
)
// ---- LOAD DESK ---- //
loader.load(
  './obj/office_desk/scene.gltf',
  
  function ( gltf ) {
    gltf.scene.scale.set(5,5,5)
    scene.add( gltf.scene )
    
  },
  
  function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened', err );
	}
)

// ---- (pointLight) color / intensity / distance / decay ---- //
const pointLight = new THREE.PointLight(0xffffff, 100, 1000, 1)
pointLight.position.set(5,15,5)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
// scene.add(ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function animate(){
  requestAnimationFrame( animate )
  
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01
  
  if( skateboard ) skateboard.rotation.z += 0.01
  
  controls.update()
  
  renderer.render(scene, camera)
}
animate()