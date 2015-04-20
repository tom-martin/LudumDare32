var gh = new GeomHelper();
var buildingGeom = new THREE.Geometry();
buildingGeom.faceVertexUvs[0] = [];
var faceVertIndex = 0;
gh.createBuildingGeom(buildingGeom, faceVertIndex, 7.5, 7.5, 7.5);
buildingGeom.computeFaceNormals();

var buildingTexture1 = THREE.ImageUtils.loadTexture( "textures/building1.png" );
buildingTexture1.magFilter = THREE.NearestFilter;

var buildingTexture2 = THREE.ImageUtils.loadTexture( "textures/building2.png" );
buildingTexture2.magFilter = THREE.NearestFilter;

var buildingTexture3 = THREE.ImageUtils.loadTexture( "textures/building3.png" );
buildingTexture3.magFilter = THREE.NearestFilter;

function Building(x, z, width, depth, scene) {
	this.depth = depth;
	this.width = width;

	var buildingTex = buildingTexture1;
	var chance = Math.random();
	if(chance < 0.33) {
		buildingTex = buildingTexture2;
	} else if(chance < 0.66) {
		buildingTex = buildingTexture3;
	}

	var buildingMaterial = new THREE.MeshLambertMaterial( {map: buildingTex, transparent: true, opacity: 1.0 } );

	var mesh = new THREE.Mesh( buildingGeom, buildingMaterial );
	scene.add( mesh );
	this.position = new THREE.Vector3(x, 0, z);
	
	mesh.position.copy(this.position);
	mesh.position.y -= 1.25;

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