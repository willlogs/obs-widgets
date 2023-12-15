import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

var params = {
  snowfall: 10,
};

function init() {
  console.log("test");
  var frame = 5;
  var meshList = [];
  var renderer = new THREE.WebGLRenderer({
    alpha: true
  });

  renderer.setPixelRatio(1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight
  );
  camera.position.set(0, 0, -10);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x00000000);
  scene.fog = new THREE.Fog(0x999999, 0, 2000);

  window.addEventListener(
    "resize",
    function () {
      onWindowResize(camera, renderer);
    },
    false
  );

  const loader = new GLTFLoader();
  loader.load('three.gltf', (gltf) => {
    scene.add(gltf.scene);
  }, undefined, (err) => {
    console.error(err);
  });

  tick();
  function tick() {
    for (var i = 0; i < meshList.length; i++) {
      meshList[i].update();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(tick);

    frame++;
    if (frame % 10 == 0) {
      var mesh = new SnowFlakes();
      scene.add(mesh);
      meshList.push(mesh);
      return;
    }
  }
}

class SnowFlakes extends THREE.Object3D {
  constructor() {
    super();
    this.snowList = [];
    this.angle = 0;

    var length = params.snowfall;

    var geometry = new THREE.BufferGeometry();

    var materials = [];

    var textureLoader = new THREE.TextureLoader();
    var sprite1 = textureLoader.load(
      "https://dl.dropbox.com/s/13ec3ht27adnu1l/snowflake1.png?dl=0"
    );
    var sprite2 = textureLoader.load(
      "https://dl.dropbox.com/s/rczse8o8zt5mxe6/snowflake2.png?dl=0"
    );
    var sprite3 = textureLoader.load(
      "https://dl.dropbox.com/s/cs17pph4bu096k7/snowflake3.png?dl=0"
    );
    var sprite4 = textureLoader.load(
      "https://dl.dropbox.com/s/plwtcfvokuoz931/snowflake4.png?dl=0"
    );
    var sprite5 = textureLoader.load(
      "https://dl.dropbox.com/s/uhh77omqdwqo2z5/snowflake5.png?dl=0"
    );

    var vertices = [];
    for (var i = 0; i < length; i++) {
      var x = getRandom(0, 500);
      var y = getRandom(0, 500);
      var z = getRandom(0, 500);
      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    var parameters = [
      ["#FFFFFF", sprite2, getRandom(10, 10)],
      ["#FFFFFF", sprite3, getRandom(10, 15)],
      ["#FFFFFF", sprite1, getRandom(10, 15)],
      ["#FFFFFF", sprite5, getRandom(5, 10)],
      ["#FFFFFF", sprite4, getRandom(5, 10)],
    ];

    for (var i = 0; i < parameters.length; i++) {
      var sprite = parameters[i][1];
      var size = parameters[i][2];
      materials[i] = new THREE.PointsMaterial({
        size: size,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      });

      var particles = new THREE.Points(geometry, materials[i]);
      particles.rotation.x = Math.random() * 360;
      particles.rotation.y = Math.random() * 360;
      particles.rotation.z = Math.random() * 360;
      particles.vx = 0;
      particles.vy = 0;
      particles.material.opacity = 0;

      this.add(particles);
      this.snowList.push(particles);
    }
  }

  update() {
    this.angle += 0.001;

    for (var i = 0; i < this.snowList.length; i++) {
      this.snowList[i].material.opacity += 0.01;
      this.snowList[i].vy -= 1;
      this.snowList[i].vx = Math.sin(this.angle) * Math.cos(this.angle) * 10;

      this.snowList[i].vx *= 0.2;
      this.snowList[i].vy *= 0.6;

      this.snowList[i].position.x += this.snowList[i].vx;
      this.snowList[i].position.y += this.snowList[i].vy;

      if (this.snowList[i].position.y < -1000) {
        this.snowList[i].material.opacity += 0.1;
        this.remove(this.snowList[i]);
        this.snowList.splice(i, 1);
        i -= 1;
      }
    }
  }
}

function onWindowResize(camera, renderer) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export {init};