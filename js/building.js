var buildingGeometry = new THREE.BoxGeometry( 20, 10, 10 );
var buildingMaterial = new THREE.MeshLambertMaterial( {color: 0xff0000} );

function Building(scene) {
	var mesh = new THREE.Mesh( buildingGeometry, buildingMaterial );
	scene.add( mesh );
	this.position = new THREE.Vector3(15, 0, 0);
	mesh.position.copy(this.position);
	mesh.position.y += 5;
}