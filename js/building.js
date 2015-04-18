function Building(width, depth, scene) {
	this.depth = depth;
	this.width = width;

	var buildingGeometry = new THREE.BoxGeometry( width, 10, depth);
	var buildingMaterial = new THREE.MeshLambertMaterial( {color: 0xff0000} );

	var mesh = new THREE.Mesh( buildingGeometry, buildingMaterial );
	scene.add( mesh );
	this.position = new THREE.Vector3(15, 0, 0);
	
	mesh.position.copy(this.position);
	mesh.position.y += 5;
}