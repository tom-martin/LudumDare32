var antidoteTexture = THREE.ImageUtils.loadTexture( "textures/antidote.png" );
antidoteTexture.magFilter = THREE.NearestFilter;

function Antidote(playerPosition, citySize, scene) {
	var self = this;

	var geom = new THREE.BoxGeometry(2, 2, 2);
	var material = new THREE.MeshLambertMaterial( {map: antidoteTexture} );
	var mesh = new THREE.Mesh( geom, material);

	function findNewPosition(playerPosition) {
		var tooClose = true;
		while(tooClose) {
			var antidoteX = Math.round(Math.random()*(citySize/10))-(citySize/20);
	    	var antidoteZ = Math.round(Math.random()*(citySize/10))-(citySize/20);

			self.position = new THREE.Vector3(10+(antidoteX*20), 0, 10+(antidoteX*20));
			mesh.position.x = self.position.x;
			mesh.position.z = self.position.z;

			tooClose = self.position.distanceTo(playerPosition) < 50;
			console.log("Retrying antidote positioning");
		}
	}

	findNewPosition(playerPosition);
	

	scene.add(mesh);

	var bounce = 0;
	var bounceSpeed = 4;
	var minBounce = 0;
	var maxBounce = 3;

	this.update = function(player, tick) {
		bounce += tick * bounceSpeed;
		if(bounce < minBounce || bounce > maxBounce) {
			bounce = Math.max(bounce, minBounce);
			bounce = Math.min(bounce, maxBounce);
			bounceSpeed = -bounceSpeed;
		}

		mesh.position.y = bounce;
		mesh.rotation.y = bounce*Math.PI/1.5;

		if(this.position.distanceToSquared(player.position) < 16) {
			player.antidotesObtained += 1;

			playRandomSound(collectSounds, 1);

			player.updatePickups();

			if(player.antidotesObtained >= 3) {
				player.hasAntidote = true;
				mesh.visible = false;
			} else {
				findNewPosition(player.position);
			}
		}
	}
}