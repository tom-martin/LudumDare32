var antidoteTexture = THREE.ImageUtils.loadTexture( "textures/antidote.png" );
antidoteTexture.magFilter = THREE.NearestFilter;

function Antidote(citySize, scene) {
	var self = this;

	var geom = new THREE.BoxGeometry(2, 2, 2);
	var material = new THREE.MeshLambertMaterial( {map: antidoteTexture} );
	var mesh = new THREE.Mesh( geom, material);

	function findNewPosition() {
		var antidoteX = Math.round(Math.random()*(citySize/10))-(citySize/20);
    	var antidoteZ = Math.round(Math.random()*(citySize/10))-(citySize/20);

		self.position = new THREE.Vector3(10+(antidoteX*20), 0, 10+(antidoteX*20));
		mesh.position.x = self.position.x;
		mesh.position.z = self.position.z;
	}

	findNewPosition();
	

	scene.add(mesh);

	var bounce = 0;
	var bounceSpeed = 4;
	var maxBounce = 2;

	this.update = function(player, tick) {
		bounce += tick * bounceSpeed;
		if(bounce < -maxBounce || bounce > maxBounce) {
			bounce = Math.max(bounce, -maxBounce);
			bounce = Math.min(bounce, maxBounce);
			bounceSpeed = -bounceSpeed;
		}

		mesh.position.y = bounce;
		mesh.rotation.y = bounce*Math.PI/2;

		if(this.position.distanceToSquared(player.position) < 4) {
			player.antidotesObtained += 1;

			if(player.antidotesObtained >= 1) {
				player.hasAntidote = true;
				mesh.visible = false;
			} else {
				findNewPosition();
			}
		}
	}
}