
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
	var headMaterial = new THREE.MeshLambertMaterial( {map: headTexture, transparent: true, opacity: 1.0 } );
	var headMesh = new THREE.Mesh( headGeom,  headMaterial);
	scene.add( headMesh );

	var bodyMaterial = new THREE.MeshLambertMaterial( {map: bodyTexture, transparent: true, opacity: 1.0 } );
	var bodyMesh = new THREE.Mesh( bodyGeom,  bodyMaterial);
	scene.add( bodyMesh );

	var gunMaterial = new THREE.MeshLambertMaterial( {map: gunTexture} );
	var gunMesh = new THREE.Mesh( gunGeom,  gunMaterial);
	scene.add( gunMesh );

	var tankMaterial = new THREE.MeshLambertMaterial( {map: tankTexture} );
	var tankMesh = new THREE.Mesh( tankGeom,  tankMaterial);
	scene.add( tankMesh );

	var healthMaterial = new THREE.MeshLambertMaterial( {color: 0xff0000} );
	var healthGeom = new THREE.BoxGeometry(2, 0.2, 0.2);
	var healthMesh = new THREE.Mesh( healthGeom,  healthMaterial);
	scene.add( healthMesh );

	var waterBarMaterial = new THREE.MeshLambertMaterial( {color: 0x00ffff} );
	var waterBarGeom = new THREE.BoxGeometry(2, 0.2, 0.2);
	var waterBarMesh = new THREE.Mesh( waterBarGeom,  waterBarMaterial);
	scene.add( waterBarMesh );	

	this.position = new THREE.Vector3(0, 0, 0);
	this.nextPosition = new THREE.Vector3(0.1, 0, 0.1);
	var speed = 8;

	var bounce = 0;
	var bounceSpeed = 3;
	var maxBounce = 0.25;

	this.health = 1;
	var healthCost = 0.2;
	var lastDamageTime = 0;

	var damagedOpacity = 1;
	var damagedOpacitySpeed = 5;
	var minDamageOpacity = 0.1;
	var maxDamageOpacity = 1;
	var waterLevel = 1;

	var deadRotation = 0;
	var deathFallSpeed = 4;

	this.update = function(input, spray, now, tick) {
		var dir = input.getDirection();

		if(this.health > 0) {

			if(dir.x != 0 || dir.z != 0) {
				bounce += tick * bounceSpeed;
				if(bounce < -maxBounce || bounce > maxBounce) {
					bounce = Math.max(bounce, -maxBounce);
					bounce = Math.min(bounce, maxBounce);
					bounceSpeed = -bounceSpeed;
				}
			}

			if(now - lastDamageTime < 5000) {
				damagedOpacity += tick * damagedOpacitySpeed;
				if(damagedOpacity < -minDamageOpacity || damagedOpacity > maxDamageOpacity) {
					damagedOpacity = Math.max(damagedOpacity, minDamageOpacity);
					damagedOpacity = Math.min(damagedOpacity, maxDamageOpacity);
					damagedOpacitySpeed = -damagedOpacitySpeed;
				}
			} else {
				damagedOpacity = 1;
			}
			headMaterial.opacity = damagedOpacity;
			bodyMaterial.opacity = damagedOpacity;

			this.nextPosition.copy(this.position);
			
			this.nextPosition.x += dir.x * tick * speed;
			this.nextPosition.z += dir.z * tick * speed;

			bodyMesh.rotation.y = spray.rotationForPlayer;
			headMesh.rotation.y = spray.rotationForPlayer;
			gunMesh.rotation.y = spray.rotationForPlayer;
			tankMesh.rotation.y = spray.rotationForPlayer;
		} else {
			damagedOpacity = 1;
			spray.waterLevel = 0;
			if(deadRotation < Math.PI/2) {
				deadRotation+=(tick*deathFallSpeed);
			}

			bodyMesh.rotation.x = deadRotation;
			headMesh.rotation.x = deadRotation;
			gunMesh.rotation.x = deadRotation;
			tankMesh.rotation.x = deadRotation;
		}

		healthMesh.scale.x = this.health;
		healthMesh.visible = this.health > 0;
		waterBarMesh.scale.x = spray.waterLevel;
		waterLevel = spray.waterLevel;
		waterBarMesh.visible = waterLevel > 0;
	}

	this.applyNextMove= function() {
		this.position.copy(this.nextPosition);
		headMesh.position.copy(this.position);
		headMesh.position.y -= (bounce/2);
		headMesh.position.y += 0.5
		bodyMesh.position.copy(this.position);
		bodyMesh.position.y += bounce;

		if(this.health > 0) {
			gunMesh.position.copy(this.position);
			gunMesh.position.y += bounce;

			tankMesh.position.copy(this.position);
			tankMesh.position.y += bounce;
		}

		healthMesh.position.copy(this.position);
		healthMesh.position.y += 4;
		healthMesh.position.x -= (1-this.health);

		waterBarMesh.position.copy(this.position);
		waterBarMesh.position.y += 4.4;
		waterBarMesh.position.x -= (1-waterLevel);
	}

	this.takeDamage = function(now) {
		if(now - lastDamageTime > 5000) {
			lastDamageTime = now;
			this.health -= healthCost;
		}

		if(this.health < healthCost) {
			this.health = 0;
		}
	}

	this.applyNextMove();
}
