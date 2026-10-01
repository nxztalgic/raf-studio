import * as THREE from "three";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

import vertexShader from './shaders/vert.glsl?raw';
import fragmentShader from './shaders/frag.glsl?raw';

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const geometry = new THREE.PlaneGeometry(1,1);
const material = new THREE.ShaderMaterial({
  // color: 0xffff00,
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide
});

console.log(material);


const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 5)


scene.add(ambientLight)


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);



const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


function animate( time ) {
  // mesh.rotation.x = time / 2000;
  
  mesh.rotation.y = time / 1000;
  renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );
