

function Player(geom, materials, scene) {
	var material = new THREE.MeshFaceMaterial( materials );
	var mesh = new THREE.Mesh( geom,  material);
	scene.add( mesh );
	this.position = new THREE.Vector3();
	this.nextPosition = new THREE.Vector3();
	var speed = 8;

	this.update = function(input, spray, tick) {
		this.nextPosition.copy(this.position);
		var dir = input.getDirection();
		this.nextPosition.x += dir.x * tick * speed;
		this.nextPosition.z += dir.z * tick * speed;
		mesh.rotation.y = spray.rotationForPlayer;
	}

	this.applyNextMove= function() {
		this.position.copy(this.nextPosition);
		mesh.position.copy(this.position);
	}
}
