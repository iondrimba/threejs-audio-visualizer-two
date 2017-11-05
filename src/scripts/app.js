import Loader from './loader';
import { TweenMax, Power2 } from 'gsap';

class App {
  constructor() {

    this.loader = new Loader();
    this.loader.progress((percent) => {
      this.progress(percent);
    });

    this.loaderBar = document.querySelector('.loader');

    this.loader.load('audio.mp3');
    this.loader.complete = this.complete.bind(this);
    this.totalSpheres = 625;
    this.spheres = [];

    this.setupAudio();
    this.createScene();
    this.addAmbientLight();
    this.addHemisphereLight();
    this.addDirectionalLight();
    this.addSpotLight();

    this.sphereGroup = new THREE.Object3D();
    this.scene.add(this.sphereGroup);

    this.addFloor();
    this.addGrid();
    this.positionSpheres();

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
    this.scene.background = new THREE.Color(0x0);


    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);

    this.renderer = new THREE.WebGLRenderer({ atialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    document.body.appendChild(this.renderer.domElement);

    this.controls = new THREE.OrbitControls(this.camera);
    this.controls.noPan = true;
    this.camera.position.z = 20;
    this.camera.position.y = 0;

    this.scene.rotateX(.5);
    this.scene.rotateY(.8);
  }

  createSphere() {
    const geometry = new THREE.SphereGeometry(.3, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x4b12b3,
      specular: 0xffffff,
      shininess: 100,
      emissive: 0x0,
      shading: THREE.SmoothShading,
      side: THREE.DoubleSide
    });

    let sphere = new THREE.Mesh(geometry, material);
    sphere.position.y = .5;
    sphere.castShadow = true;
    sphere.receiveShadow = true;

    return sphere;
  }

  addDirectionalLight() {
    this.light = new THREE.DirectionalLight(0x000000, .2);
    this.light.position.set(0, 1000, 0);
    this.scene.add(this.light);
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight(0xffffff, .1);
    this.scene.add(light);
  }

  addHemisphereLight() {
    var light = new THREE.HemisphereLight(0xffffff, 0x0, .3);
    this.scene.add(light);
  }

  addSpotLight() {
    const spotLight = new THREE.SpotLight(0xffffff, 1);

    spotLight.position.set(0, 20, 0);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 4000;
    spotLight.shadow.mapSize.height = spotLight.shadow.mapSize.width;

    this.scene.add(spotLight);
  }


  animate() {
    this.renderer.render(this.scene, this.camera);

    this.controls.update();

    this.drawWave();

    requestAnimationFrame(this.animate.bind(this));
  }

  addGrid() {
    const size = 25;
    const divisions = 25;

    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.set(0, 0, 0);
    gridHelper.material.opacity = 0.50;
    gridHelper.material.transparent = true;
    this.scene.add(gridHelper);
  }

  radians(degrees) {
    return degrees * Math.PI / 180;
  }

  positionSpheres() {
    const width = 8;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        let sphere = this.createSphere();
        this.sphereGroup.add(sphere);
        sphere.position.x = i;
        sphere.position.z = j;

        this.spheres.push(sphere);
      }
    }

    this.sphereGroup.position.set(-4, 0, -4);
  }

  addFloor() {
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x0000,
      shininess: 100,
      shading: THREE.SmoothShading,
      side: THREE.BackSide
    });
    this.object = new THREE.Mesh(new THREE.PlaneGeometry(25, 25), material);
    this.object.position.set(0, 0, 0);
    this.object.receiveShadow = true;
    this.object.rotation.x = this.radians(90);
    this.scene.add(this.object);
  }


  drawWave() {
    if (this.playing) {

      this.analyser.getByteFrequencyData(this.frequencyData);

      for (var i = 0; i < 64; i++) {
        var p = this.frequencyData[i];
        var s = this.spheres[i];
        var z = s.position;

        TweenMax.to(z, .2, {
          y: p / 40
        });
      }
    }
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
    this.audioElement.volume = 1;
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
