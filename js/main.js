var scene = null;
var threeCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000 );


var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

var lastFrameTime = Date.now();

var player = null;
var input = null;
var camera = null;
var collision = null;
var spray = null;
var npcs = [];
var buildings = [];
var antidote = null;

var dialog = null;

var gameOver = false;

var citySize = 50;

var npcSpeedAccumulation = 0;

var unhealedNpc = null;

var init = function() {
    var dialog = document.getElementById("dialog");
    dialog.style.display = 'none';
    scene = new THREE.Scene();

    npcSpeedAccumulation = 0;

    gameOver = false;

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

    player = new Player(scene);
    input = new Input();

    camera = new Camera(player, threeCamera);
    collision = new Collision();

    spray = new Spray(scene);

    npcs = [];
    for(var i = 0; i < 6; i++) {
        npcs.push(new Npc(scene));
    }

    buildings = [];

    for(var x = -citySize-20; x <= citySize+40; x+=20) {
        for(var z = -citySize-20; z <= citySize+40; z+=20) {
            if(Math.random() < 0.50) {
                buildings.push(new Building(x, z, 15, 15, scene));
            }
        }
    }

    antidote = new Antidote(citySize, scene);

    for(var x = -citySize-25; x <= citySize+25; x+=50) {
        buildings.push(new Building(x, -citySize-50, 50, 10, scene));
        buildings.push(new Building(x, citySize+50, 50, 10, scene));
    }

    for(var z = -citySize-25; z <= citySize+25; z+=50) {
        buildings.push(new Building(-citySize-50, z, 10, 50, scene));
        buildings.push(new Building(citySize+50, z, 10, 50, scene));
    }

    render();
}

function render() {
    stats.begin();
    var now = Date.now();
    var tick = Math.min(0.1, (now - lastFrameTime) / 1000);
    lastFrameTime = now;
    requestAnimationFrame(render);

    player.update(input, spray, antidote, gameOver, unhealedNpc, now, tick);

    var healedCount = 0;

    npcSpeedAccumulation += tick;
    var npcSpeed = Math.min(5, 2+(npcSpeedAccumulation / 10));

    nearestUnhealedNpc = null;
    var nearestUnhealedDistance = 100000;
    for(var i in npcs) {
        var npc = npcs[i];
        npc.update(player, npcSpeed, tick);

        if(npc.healed) {
            healedCount += 1;
        } else if(player.hasAntidote){
            var dist = npc.position.distanceTo(player.position);
            if(dist < nearestUnhealedDistance) {
                unhealedNpc = npcs[i];
                nearestUnhealedDistance = dist;
            }
        }
    }

    if(healedCount < (npcs.length-5)) {
        unhealedNpc = null;
    }

    if(healedCount == npcs.length) {
        gameOver = true;
        document.getElementById("instructions").style.display = 'none';
        document.getElementById("dialog").style.display = 'block';
        document.getElementById("result").innerHTML = 'You saved everyone!';
        document.getElementById("button").innerHTML = 'Play Again';
    }

    if(player.health <= 0) {
        document.getElementById("instructions").style.display = 'none';
        document.getElementById("dialog").style.display = 'block';
        document.getElementById("result").innerHTML = 'You died!';
        document.getElementById("button").innerHTML = 'Play Again';
    }

    spray.update(threeCamera, player, npcs, input, now, tick);

    collision.update(player, npcs, buildings, now, tick);

    for(var i in buildings) {
        buildings[i].update(player, tick);
    }

    antidote.update(player, tick);

    camera.update(player, tick);

    renderer.render(scene, threeCamera);
    stats.end();
}
