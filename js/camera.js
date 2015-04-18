function Camera(player, threeCamera) {
	
	var target = new THREE.Vector3();
	target.copy(player.position);
	var diff = new THREE.Vector3();
	var speed = 10;

	this.update = function(toTrack, tick) {
		diff.copy(target).sub(toTrack.position);
		target.x -= diff.x * tick * speed;
		target.y -= diff.y * tick * speed;
		target.z -= diff.z * tick * speed;

		threeCamera.position.x = target.x;
	    threeCamera.position.y = 20;
	    threeCamera.position.z = target.z+5;
	    
	    threeCamera.lookAt(target);
	}
}
