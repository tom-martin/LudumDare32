
var gh = new GeomHelper();
var headGeom = new THREE.Geometry();
headGeom.faceVertexUvs[0] = [];
var faceVertIndex = 0;
gh.createHeadGeom(headGeom, faceVertIndex, 0.5, 0.5, 0.5);
headGeom.computeFaceNormals();

var bodyGeom = new THREE.Geometry();
bodyGeom.faceVertexUvs[0] = [];
faceVertIndex = 0;
gh.createBodyGeom(bodyGeom, faceVertIndex, 1, 1, 0.5);
bodyGeom.computeFaceNormals();

var headTexture = THREE.ImageUtils.loadTexture( "textures/playerHead.png" );
headTexture.magFilter = THREE.NearestFilter;

var bodyTexture = THREE.ImageUtils.loadTexture( "textures/playerBody.png" );
bodyTexture.magFilter = THREE.NearestFilter;

function Player(scene) {
	var headMaterial = new THREE.MeshLambertMaterial( {map: headTexture } );
	var headMesh = new THREE.Mesh( headGeom,  headMaterial);
	scene.add( headMesh );

	var bodyMaterial = new THREE.MeshLambertMaterial( {map: bodyTexture } );
	var bodyMesh = new THREE.Mesh( bodyGeom,  bodyMaterial);
	scene.add( bodyMesh );

	this.position = new THREE.Vector3();
	this.nextPosition = new THREE.Vector3();
	var speed = 8;

	var bounce = 0;
	var bounceSpeed = 3;
	var maxBounce = 0.25;

	this.update = function(input, spray, tick) {
		var dir = input.getDirection();

		if(dir.x != 0 || dir.z != 0) {
			bounce += tick * bounceSpeed;
			if(bounce < -maxBounce || bounce > maxBounce) {
				bounce = Math.max(bounce, -maxBounce);
				bounce = Math.min(bounce, maxBounce);
				bounceSpeed = -bounceSpeed;
			}
		}

		this.nextPosition.copy(this.position);
		
		this.nextPosition.x += dir.x * tick * speed;
		this.nextPosition.z += dir.z * tick * speed;

		bodyMesh.rotation.y = spray.rotationForPlayer;
		headMesh.rotation.y = spray.rotationForPlayer;
	}

	this.applyNextMove= function() {
		this.position.copy(this.nextPosition);
		headMesh.position.copy(this.position);
		headMesh.position.y -= (bounce/2);
		headMesh.position.y += 0.5
		bodyMesh.position.copy(this.position);
		bodyMesh.position.y += bounce;
	}
}
