/**
 * 3d building effect
 * https://codepen.io/ndaidong/pen/qNZyoy
**/

/* global THREE doc */

((name, factory) => {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    let root = window || {};
    if (root.define && root.define.amd) {
      root.define([], factory);
    } else if (root.exports) {
      root.exports = factory();
    } else {
      root[name] = factory();
    }
  }
})('Building3d', () => {

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xffffff, 0.13);

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 15);

  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setClearColor(0xffffff);
  renderer.setSize(window.innerWidth, window.innerHeight);

  var bannerCanvas = doc.get('bannerCanvas');
  doc.add(renderer.domElement, bannerCanvas);

  // Floor
  var floorG = new THREE.BoxGeometry(20, 0.10, 20);
  var floorM = new THREE.MeshLambertMaterial({color: 0x204555});
  var floor = new THREE.Mesh(floorG, floorM);
  scene.add(floor);

  // Buildings
  var cube = [];
  for (let i = 0; i < 1000; ++i) {
    let rHeight = Math.random() * 5 + 0.25;
    let geometry = new THREE.BoxGeometry(0.25, rHeight, 0.25);
    let material = new THREE.MeshLambertMaterial({color: 0x59bfea});
    material.transparent = true;
    material.opacity = 1;
    cube[i] = new THREE.Mesh(geometry, material);
    floor.add(cube[i]);

    let x = (Math.random() * (10.00 - -10) + -10).toFixed(2);
    let y = 0;
    let z = (Math.random() * (10.00 - -10) + -10).toFixed(2);
    cube[i].position.set(x, y, z);
  }

  // camera
  camera.position.set(0, 3, 10);

  // lights
  var light1 = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(light1);
  light1.position.set(1.5, 2, 1);

  var light2 = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(light2);
  light2.position.set(-1.5, 2, 1);


  var distance = 0;
  var floorRotation = 1;
  var cameraPosition = 1;
  var easingAmount = 0.001;

  var render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    let xDistance = floorRotation - floor.rotation.y;
    let yDistance = cameraPosition - camera.position.z;
    distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    if (distance > 0) {
      floor.rotation.y += xDistance * easingAmount;
      camera.position.z += yDistance * easingAmount;
    }
  };

  var onWindowResize = () => {
    let w = window.innerWidth;
    let h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  window.onresize = onWindowResize;

  doc.Event.on('bannerText', 'mousemove', (e) => {
    let rotateDamper = 600;
    floorRotation = -((e.clientX - bannerCanvas.offsetWidth) / rotateDamper);
  });

  return render();
});
