function Npc(scene) {
	var geometry = new THREE.BoxGeometry( 1, 2, 1 );
	var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
	var mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	this.position = new THREE.Vector3((Math.random()*500)-250, 0, (Math.random()*500)-250);
	this.nextPosition = new THREE.Vector3();
	var speed = 5-Math.random();

	var dir = new THREE.Vector3(0, 0, 0);
	this.update = function(player, tick) {
		this.nextPosition.copy(this.position);
		dir.x = player.position.x - this.position.x;
		dir.z = player.position.z - this.position.z;
		dir.normalize();
		this.nextPosition.x += dir.x * tick * speed;
		this.nextPosition.z += dir.z * tick * speed;
	}

	this.applyNextMove= function() {
		this.position.copy(this.nextPosition);
		mesh.position.copy(this.position);
	}
}
