// Initial Three.js set up
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

// Renderer settings
renderer.setPixelRatio( window. devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

// Camera settings
camera.position.setZ(0);
camera.position.setX(-3);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add ( ambientLight );

// Background image pre-loader
// Image credits to: Ivana Cajina @ https://unsplash.com/photos/asuyh-_ZX54
const loader = new THREE.TextureLoader();

// Load image resource
loader.load(
  'assets/ivana-cajina-asuyh-_ZX54-unsplash.jpg',

  // onLoad callback
  function (texture){
    scene.background = texture;
    animate();
  }
);

// Create 2000 stars, and randomly set their x, y, and z positions, and assign each one of them one of 4 random colours
for (let i = 0; i < 3000; i++){

  const geometry = new THREE.SphereGeometry( 0.28, 24, 24 );

  const colours = [0xb7748c, 0xaed7ff, 0xb572b0, 0xffffff];
  let colourRandomizer = Math.floor(Math.random() * 4);
  const material = new THREE.MeshBasicMaterial ( {color: colours[colourRandomizer] });

  let star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => Math.random() * 600 - 300)
  star.position.set(x, y, z);
  scene.add( star );
}

// Button listener to add warp speed effect on mouse hover
const button = document.getElementById('explore-button');
let z = 0;
let mouseHovering = false;

button.addEventListener('mouseover', function(){
    mouseHovering = true;
});

button.addEventListener('mouseout', function(){
    mouseHovering = false;
    z = 0;
})

function animate(){
  
    document.getElementById('gif').style.visibility = 'hidden';
    document.getElementById('loading-screen').style.visibility = 'hidden';

  // Pan the camera slowly forwards, have it pan forward exponentially if the user's mouse is hovering over the explore button
  if (mouseHovering){
      camera.translateZ(z -= 0.02)
  } else {
    camera.translateZ(-0.08); 
  }

  // Reset the camera position. Constantly rendering new stars would have taken way too much processing power.
  if (camera.position.z <= -150){
    camera.position.z = 20;
  };

  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

