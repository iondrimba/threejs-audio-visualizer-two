!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(i,a,function(t){return e[t]}.bind(null,a));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.callback=null}var t,n,a;return t=e,(n=[{key:"load",value:function(e){var t=this,n=new XMLHttpRequest;n.open("GET",e,!0),n.onprogress=function(e){var n=Math.floor(e.loaded/e.total*100);t.callback(n)},n.onload=function(){t.complete(e)},n.send()}},{key:"progress",value:function(e){this.callback=e}},{key:"complete",value:function(){}}])&&i(t.prototype,n),a&&i(t,a),e}();function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r=function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.loader=new a,this.loader.progress((function(e){t.progress(e)})),this.playIntro=document.querySelector(".play-intro"),this.loaderBar=document.querySelector(".loader"),this.loader.load("https://iondrimbafilho.me/demo.mp3"),this.loader.complete=this.complete.bind(this),this.count=0,this.percent=0,this.playing=!1,this.objects=[]}var t,n,i;return t=e,(n=[{key:"progress",value:function(e){var t=this;this.loaderBar.style.transform="scale("+e/100+", .999)",100===e&&setTimeout((function(){requestAnimationFrame((function(){t.playIntro.classList.add("control-show"),t.loaderBar.classList.add("removeLoader"),t.loaderBar.style.transform="scale(.999, 0)"}))}),300)}},{key:"complete",value:function(e){var t=this;setTimeout((function(){t.firstRing=new THREE.Object3D,t.secondRing=new THREE.Object3D,t.thirdRing=new THREE.Object3D,t.fourthRing=new THREE.Object3D,t.setupAudio(),t.addSoundControls(),t.createScene(),t.createCamera(),t.addAmbientLight(),t.addSpotLight(),t.addCameraControls(),t.addFloor(),t.createRingOfSquares(20,1,4346058,t.firstRing),t.createRingOfSquares(30,2,7479201,t.secondRing),t.createRingOfSquares(40,3,16342072,t.thirdRing),t.createRingOfSquares(50,4,6164358,t.fourthRing),t.animate(),t.playSound(e)}),200)}},{key:"addSoundControls",value:function(){var e=this;this.btnPlay=document.querySelector(".play"),this.btnPause=document.querySelector(".pause"),this.btnPlay.addEventListener("click",(function(){e.audioElement.play(),e.btnPlay.classList.remove("control-show"),e.btnPause.classList.add("control-show")})),this.btnPause.addEventListener("click",(function(){e.audioElement.pause(),e.btnPause.classList.remove("control-show"),e.btnPlay.classList.add("control-show")}))}},{key:"createRingOfSquares",value:function(e,t,n,i){for(var a=new THREE.BoxBufferGeometry(.5,.5,.5),o=new THREE.MeshLambertMaterial({color:n}),r=0;r<e;r++){var s=360/e,u=this.radians(s*r),c=this.createObj(a,o),d=2*t,l=Math.sin(u)*d,h=Math.cos(u)*d;c.position.set(l,0,h),c.rotateY(u),this.objects.push(c),i.add(c)}this.scene.add(i)}},{key:"createScene",value:function(){this.scene=new THREE.Scene,this.scene.background=new THREE.Color(15818568),this.renderer=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=THREE.PCFSoftShadowMap,document.body.appendChild(this.renderer.domElement)}},{key:"createCamera",value:function(){this.camera=new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,1e3),this.camera.position.set(-10,16,8),this.scene.add(this.camera)}},{key:"addCameraControls",value:function(){this.controls=new THREE.OrbitControls(this.camera,this.renderer.domElement)}},{key:"addGrid",value:function(){var e=new THREE.GridHelper(25,25);e.position.set(0,0,0),e.material.opacity=.5,e.material.transparent=!0,this.scene.add(e)}},{key:"createObj",value:function(e,t){var n=new THREE.Mesh(e,t);return n.castShadow=!0,n.receiveShadow=!0,n}},{key:"onResize",value:function(){var e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}},{key:"addFloor",value:function(){var e=new THREE.PlaneGeometry(2e3,2e3),t=new THREE.ShadowMaterial({opacity:.08}),n=new THREE.Mesh(e,t);e.rotateX(-Math.PI/2),n.position.y=-1,n.receiveShadow=!0,this.scene.add(n)}},{key:"moveRingGroup",value:function(e,t){e.rotation.y+=t}},{key:"addSpotLight",value:function(){var e=new THREE.SpotLight(16777215);e.position.set(0,20,1),e.castShadow=!0,this.scene.add(e)}},{key:"addAmbientLight",value:function(){var e=new THREE.AmbientLight(16777215);this.scene.add(e)}},{key:"animate",value:function(){this.controls.update(),this.drawWave(),this.renderer.render(this.scene,this.camera),requestAnimationFrame(this.animate.bind(this))}},{key:"radians",value:function(e){return e*Math.PI/180}},{key:"drawWave",value:function(){if(this.playing){this.analyser.getByteFrequencyData(this.frequencyData);for(var e=0;e<140;e++){var t=this.frequencyData[e],n=this.objects[e].position;TweenMax.to(n,.2,{y:t/20})}}this.moveRingGroup(this.firstRing,.01),this.moveRingGroup(this.secondRing,-.01),this.moveRingGroup(this.thirdRing,.02),this.moveRingGroup(this.fourthRing,-.02)}},{key:"play",value:function(){this.audioCtx.resume(),this.audioElement.play(),this.btnPlay.classList.remove("control-show"),this.btnPause.classList.add("control-show")}},{key:"pause",value:function(){this.audioElement.pause(),this.btnPause.classList.remove("control-show"),this.btnPlay.classList.add("control-show")}},{key:"setupAudio",value:function(){var e=this;this.audioElement=document.getElementById("audio"),this.audioCtx=new(window.AudioContext||window.webkitAudioContext),this.analyser=this.audioCtx.createAnalyser(),this.source=this.audioCtx.createMediaElementSource(this.audioElement),this.source.connect(this.analyser),this.source.connect(this.audioCtx.destination),this.bufferLength=this.analyser.frequencyBinCount,this.frequencyData=new Uint8Array(this.bufferLength),this.audioElement.volume=.5,this.audioElement.addEventListener("playing",(function(){e.playing=!0})),this.audioElement.addEventListener("pause",(function(){e.playing=!1})),this.audioElement.addEventListener("ended",(function(){e.playing=!1}))}},{key:"playSound",value:function(e){var t=this;setTimeout((function(){t.playIntro.addEventListener("click",(function(e){e.currentTarget.classList.remove("control-show"),t.play()})),t.audioElement.src=e}),500)}}])&&o(t.prototype,n),i&&o(t,i),e}();window.addEventListener("DOMContentLoaded",(function(){var e=new r;window.addEventListener("resize",e.onResize.bind(e))}))}]);