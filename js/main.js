var scene = new THREE.Scene();
var threeCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000 );


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapCullFace = THREE.CullFaceBack;
document.body.appendChild( renderer.domElement );

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

var light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(1,1,1);
scene.add(light1);

var light2 = new THREE.DirectionalLight(0xffffff, 0.7);
light2.position.set(0,1,0);
scene.add(light2);

var light3 = new THREE.DirectionalLight(0xffffff, 0.4);
light3.position.set(1,0,-1);
scene.add(light3);

var light4 = new THREE.DirectionalLight(0xffffff, 0.4);
light4.position.set(-1,0,-1);
scene.add(light4);

scene.add(new THREE.AmbientLight( 0x404040 ));

var lastFrameTime = Date.now();

var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {


};

var player = null;
var input = null;
var camera = null;
var collision = null;
var spray = null;
var npcs = [];
var buildings = [];

var loader = new THREE.JSONLoader();


player = new Player(scene);
input = new Input();

camera = new Camera(player, threeCamera);
collision = new Collision();

spray = new Spray(scene);

npcs = [];
for(var i = 0; i < 1; i++) {
    npcs.push(new Npc(scene));
}

buildings = [];
for(var x = -250; x <= 250; x+=5) {
    for(var z = -250; z <= 250; z+=5) {
        if(Math.random() < 0.03) {
            buildings.push(new Building(x, z, Math.round(1+(Math.random()*4))*5, Math.round(1+(Math.random()*4))*5, scene));
        }
    }
}

for(var x = -250; x <= 250; x+=5) {
    for(var z = -250; z <= 250; z+=5) {
        if(x == 250 || z == 250 || x == -250 || z == -250) {
            buildings.push(new Building(x, z, Math.round(1+(Math.random()*4))*5, Math.round(1+(Math.random()*4))*5, scene));
        }
    }
}

render();

function render() {
    stats.begin();
    var now = Date.now();
    var tick = Math.min(0.1, (now - lastFrameTime) / 1000);
    lastFrameTime = now;
    requestAnimationFrame(render);

    player.update(input, spray, tick);

    for(var i in npcs) {
        npcs[i].update(player, tick);
    }

    spray.update(threeCamera, player, npcs, input, tick);

    collision.update(player, npcs, buildings, tick);

    for(var i in buildings) {
        buildings[i].update(player, tick);
    }

    camera.update(player, tick);

    renderer.render(scene, threeCamera);
    stats.end();
}
