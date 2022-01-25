import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(9);

renderer.render(scene, camera);

// Resize

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
})


// Lights

const pointLight1 = new THREE.PointLight(0xffffff, 0.4);
pointLight1.position.set(-9, 9, 10);

const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
pointLight2.position.set(12, 7, 11);

const pointLight3 = new THREE.PointLight(0xffffff, 0.3);
pointLight3.position.set(0, -5, 0);

scene.add(pointLight1, pointLight2, pointLight3);

// Background

scene.background = new THREE.Color( 0xf5f5f5 );

// Box

function addBox() {

  const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const box = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(11));

  box.position.set(x, y, z);

  function timeline() {
    let tl = gsap.timeline({onComplete: timeline})

    const num = Math.floor(Math.random() * 2);

    const pos = THREE.MathUtils.randFloatSpread(15);
    if(num == 1){
      tl.to(box.scale, {x: 2.2, duration: 1, delay: 0.8, ease: "power2.out"})
      tl.to(box.scale, {x: 1.2, duration: 1, delay: 0.8, ease: "power2.out"})
      tl.to(box.position, {x: pos, duration: 2.3, delay: 0.8, ease: "power2.out"})
  
    } else{
      tl.to(box.scale, {y: 2.2, duration: 1, delay: 0.8, ease: "power2.out"})
      tl.to(box.scale, {y: 1.2, duration: 1, delay: 0.8, ease: "power2.out"})
      tl.to(box.position, {y: pos, duration: 2.3, delay: 0.8, ease: "power2.out"})
    }
  }
  timeline();
  scene.add(box);
}

Array(19).fill().forEach(addBox);



// Animation Loop

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera);
}

animate();