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

var light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light);

scene.add(new THREE.AmbientLight( 0x808080 ));

var lastFrameTime = Date.now();

var player = new Player(scene);
var input = new Input();

var camera = new Camera(player, threeCamera);
var collision = new Collision();

var npcs = [];
for(var i = 0; i < 1000; i++) {
    npcs.push(new Npc(scene));
}

function render() {
    stats.begin();
    var now = Date.now();
    var tick = Math.min(0.1, (now - lastFrameTime) / 1000);
    lastFrameTime = now;
    requestAnimationFrame(render);

    player.update(input, tick);
    for(var i in npcs) {
        npcs[i].update(player, tick);
    }

    collision.update(player, npcs, tick);

    camera.update(player, tick);

    renderer.render(scene, threeCamera);
    stats.end();
}
render();