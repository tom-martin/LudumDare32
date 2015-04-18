var playerGeometry = new THREE.BoxGeometry( 1, 2, 1 );
var playerMaterial = new THREE.MeshLambertMaterial( {color: 0xffff00} );

function Player(scene) {
	var mesh = new THREE.Mesh( playerGeometry, playerMaterial );
	scene.add( mesh );
	this.position = new THREE.Vector3();
	this.nextPosition = new THREE.Vector3();
	var speed = 8;

	this.update = function(input, tick) {
		this.nextPosition.copy(this.position);
		var dir = input.getDirection();
		this.nextPosition.x += dir.x * tick * speed;
		this.nextPosition.z += dir.z * tick * speed;
	}

	this.applyNextMove= function() {
		this.position.copy(this.nextPosition);
		mesh.position.copy(this.position);
		mesh.position.y += 1;
	}
}
