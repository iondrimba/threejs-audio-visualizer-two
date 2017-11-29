import Loader from './loader';
import OrbitControls from 'threejs-controls/OrbitControls';
import { TweenMax, Power2 } from 'gsap';

class App {
  constructor() {

    this.loader = new Loader();
    this.loader.progress((percent) => {
      //this.progress(percent);
    });

    this.loaderBar = document.querySelector('.loader');

    this.loader.load('audio.mp3');
    this.loader.complete = this.complete.bind(this);
    this.totalSpheres = 625;
    this.spheres = [];

    this.count = 0;

    this.setupAudio();
    this.createScene();
    this.createCamera();
    this.addAmbientLight();
    this.addSpotLight();

    this.addCameraControls();
    this.addFloor();
    this.createObj();

    this.percent = 0;
    this.playing = false;
  }

  progress(percent) {
    this.loaderBar.style.transform = 'scale(' + percent / 100 + ', 1)';
    if (percent === 100) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.loaderBar.classList.add('removeLoader');
          this.loaderBar.style.transform = 'scale(1, 0)';
        })
      }, 300);
    }
  }

  complete(file) {
    setTimeout(() => {
      this.animate();
      this.playSound(file);
    }, 200);
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffed32);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(this.renderer.domElement);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.set(0, 15, 0);
    this.scene.add(this.camera);
  }

  addCameraControls() {
    this.controls = new OrbitControls(this.camera);
  }

  createObj() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({
      color: 0x4b12b3
    });

    let obj = new THREE.Mesh(geometry, material);
    obj.castShadow = true;
    obj.receiveShadow = true;

    obj.geometry.verticesNeedUpdate = true;

    this.scene.add(obj);

    return obj;
  }

  addFloor() {

    var planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    planeGeometry.rotateX(- Math.PI / 2);
    var planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -1;
    plane.receiveShadow = true;
    this.scene.add(plane);
  }


  addSpotLight() {
    const spotLight = new THREE.SpotLight(0xffffff, 1);

    spotLight.position.set(0, 20, 0);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 4000;
    spotLight.shadow.mapSize.height = spotLight.shadow.mapSize.width;

    this.scene.add(spotLight);
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight(0xffffff);
    this.scene.add(light);
  }

  animate() {
    this.renderer.render(this.scene, this.camera);

    this.controls.update();

    requestAnimationFrame(this.animate.bind(this));
  }


  radians(degrees) {
    return degrees * Math.PI / 180;
  }

  setupAudio() {
    this.audioElement = document.getElementById('audio');
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();

    this.source = this.audioCtx.createMediaElementSource(this.audioElement);
    this.source.connect(this.analyser);
    this.source.connect(this.audioCtx.destination);

    this.bufferLength = this.analyser.frequencyBinCount;

    this.frequencyData = new Uint8Array(this.bufferLength);
    this.audioElement.volume = .01;
  }

  playSound(file) {
    this.audioElement.src = file;
    this.audioElement.load();
    this.audioElement.play();

    this.playing = true;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
