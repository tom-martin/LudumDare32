function Building(x, z, width, depth, scene) {
	this.depth = depth;
	this.width = width;

	var buildingGeometry = new THREE.BoxGeometry( width, 10, depth);
	var buildingMaterial = new THREE.MeshLambertMaterial( {color: 0xff0000, transparent: true, opacity: 1.0 } );

	var mesh = new THREE.Mesh( buildingGeometry, buildingMaterial );
	scene.add( mesh );
	this.position = new THREE.Vector3(x, 0, z);
	
	mesh.position.copy(this.position);
	mesh.position.y += 5;

	var fadeSpeed = 1.5;

	this.update = function(player, tick) {
		var targetOpacity = 1;
		if(this.inRange) {
			if(this.position.z > player.position.z && Math.abs(this.position.x-player.position.x)<(width/2)) {
				targetOpacity = 0.2;
			}

			if(buildingMaterial.opacity < targetOpacity) {
	            buildingMaterial.opacity = Math.min(targetOpacity, buildingMaterial.opacity+(tick*fadeSpeed));
	        }

	        if(buildingMaterial.opacity > targetOpacity) {
	            buildingMaterial.opacity = Math.max(targetOpacity, buildingMaterial.opacity-(tick*fadeSpeed));
	        }
	    } else {
	    	buildingMaterial.opacity
	    }
	}
}