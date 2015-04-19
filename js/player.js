
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

var gunGeom = new THREE.Geometry();
gunGeom.faceVertexUvs[0] = [];
faceVertIndex = 0;
gh.createGunGeom(gunGeom, faceVertIndex, 0.25, 0.25, 1);
gunGeom.computeFaceNormals();

var tankGeom = new THREE.Geometry();
tankGeom.faceVertexUvs[0] = [];
faceVertIndex = 0;
gh.createTankGeom(tankGeom, faceVertIndex, 0.5, 0.5, 0.25);
tankGeom.computeFaceNormals();

var headTexture = THREE.ImageUtils.loadTexture( "textures/playerHead.png" );
headTexture.magFilter = THREE.NearestFilter;

var bodyTexture = THREE.ImageUtils.loadTexture( "textures/playerBody.png" );
bodyTexture.magFilter = THREE.NearestFilter;

var gunTexture = THREE.ImageUtils.loadTexture( "textures/gun.png" );
gunTexture.magFilter = THREE.NearestFilter;

var tankTexture = THREE.ImageUtils.loadTexture( "textures/gun.png" );
tankTexture.magFilter = THREE.NearestFilter;

function Player(scene) {
	var headMaterial = new THREE.MeshLambertMaterial( {map: headTexture } );
	var headMesh = new THREE.Mesh( headGeom,  headMaterial);
	scene.add( headMesh );

	var bodyMaterial = new THREE.MeshLambertMaterial( {map: bodyTexture } );
	var bodyMesh = new THREE.Mesh( bodyGeom,  bodyMaterial);
	scene.add( bodyMesh );

	var gunMaterial = new THREE.MeshLambertMaterial( {map: gunTexture } );
	var gunMesh = new THREE.Mesh( gunGeom,  gunMaterial);
	scene.add( gunMesh );

	var tankMaterial = new THREE.MeshLambertMaterial( {map: tankTexture } );
	var tankMesh = new THREE.Mesh( tankGeom,  tankMaterial);
	scene.add( tankMesh );

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
		gunMesh.rotation.y = spray.rotationForPlayer;
		tankMesh.rotation.y = spray.rotationForPlayer;
	}

	this.applyNextMove= function() {
		this.position.copy(this.nextPosition);
		headMesh.position.copy(this.position);
		headMesh.position.y -= (bounce/2);
		headMesh.position.y += 0.5
		bodyMesh.position.copy(this.position);
		bodyMesh.position.y += bounce;
		gunMesh.position.copy(this.position);
		gunMesh.position.y += bounce;

		tankMesh.position.copy(this.position);
		tankMesh.position.y += bounce;
	}
}
