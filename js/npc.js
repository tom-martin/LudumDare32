var npcHeadTexture = THREE.ImageUtils.loadTexture( "textures/zombieHead.png" );
npcHeadTexture.magFilter = THREE.NearestFilter;

var npcHeadTexture2 = THREE.ImageUtils.loadTexture( "textures/zombieHead2.png" );
npcHeadTexture2.magFilter = THREE.NearestFilter;

var npcBodyTexture = THREE.ImageUtils.loadTexture( "textures/zombieBody.png" );
npcBodyTexture.magFilter = THREE.NearestFilter;

var npcBodyTexture2 = THREE.ImageUtils.loadTexture( "textures/zombieBody2.png" );
npcBodyTexture2.magFilter = THREE.NearestFilter;

var healedBodyTexture1 = THREE.ImageUtils.loadTexture( "textures/healedBody1.png" );
healedBodyTexture1.magFilter = THREE.NearestFilter;

var healedBodyTexture2 = THREE.ImageUtils.loadTexture( "textures/healedBody2.png" );
healedBodyTexture2.magFilter = THREE.NearestFilter;

var healedBodyTexture3 = THREE.ImageUtils.loadTexture( "textures/healedBody3.png" );
healedBodyTexture3.magFilter = THREE.NearestFilter;

var healedBodyTexture4 = THREE.ImageUtils.loadTexture( "textures/healedBody4.png" );
healedBodyTexture4.magFilter = THREE.NearestFilter;

var healedHeadTexture = THREE.ImageUtils.loadTexture( "textures/healedHead.png" );
healedHeadTexture.magFilter = THREE.NearestFilter;

var healedHeadTexture2 = THREE.ImageUtils.loadTexture( "textures/healedHead2.png" );
healedHeadTexture2.magFilter = THREE.NearestFilter;

var healedHeadTexture3 = THREE.ImageUtils.loadTexture( "textures/healedHead3.png" );
healedHeadTexture3.magFilter = THREE.NearestFilter;



function Npc(scene) {
	this.healed = false;

	var headTex = npcHeadTexture;
	if(Math.random() < 0.5) {
		headTex = npcHeadTexture2;
	}
	var npcHeadMaterial = new THREE.MeshLambertMaterial( {map: headTex, transparent: true, opacity: 1.0} );
	var headMesh = new THREE.Mesh( headGeom,  npcHeadMaterial);
	scene.add( headMesh );

	var bodyTex = npcBodyTexture;
	if(Math.random() < 0.5) {
		bodyTex = npcBodyTexture2;
	}

	var npcBodyMaterial = new THREE.MeshLambertMaterial( {map: bodyTex, transparent: true, opacity: 1.0} );
	var bodyMesh = new THREE.Mesh( bodyGeom,  npcBodyMaterial);
	scene.add( bodyMesh );

	this.position = new THREE.Vector3((Math.random()*500)-250, 0, (Math.random()*500)-250);
	this.nextPosition = new THREE.Vector3();
	this.nextPosition.copy(this.position);
	var speedSeed = Math.random();

	var maxAge = 10;

	var age = Math.random()*maxAge;

	var bounce = Math.random();
	var bounceSpeed = 1.5;
	var maxBounce = 0.25;

	var forwardZ = new THREE.Vector3(0, 0, 1);

	var dir = new THREE.Vector3(0, 0, 0);
	this.update = function(player, speed, tick) {
		this.nextPosition.copy(this.position);

		age += tick;

		if(age > (maxAge-1) && !player.hasAntidote) {
			npcHeadMaterial.opacity = 1-(age-(maxAge-1));
			npcBodyMaterial.opacity = 1-(age-(maxAge-1));
		} else {
			npcHeadMaterial.opacity = 1;
			npcBodyMaterial.opacity = 1;
		}

		diff.copy(this.nextPosition);
        diff.sub(player.position);
        var angleToPlayer = diff.angleTo(forwardZ)+Math.PI;
        if(diff.x < 0) {
        	angleToPlayer = -angleToPlayer;
        }

        if(dir.x != 0 || dir.z != 0) {
			bounce += tick * bounceSpeed;
			if(bounce < -maxBounce || bounce > maxBounce) {
				bounce = Math.max(bounce, -maxBounce);
				bounce = Math.min(bounce, maxBounce);
				bounceSpeed = -bounceSpeed;
			}
		}
        
        if(age > maxAge && (!player.hasAntidote || diff.lengthSq()>300)) {
        	var chance = Math.random();
        	if(chance < 0.25) {
        		this.nextPosition.x = player.position.x+(Math.random()*30)-15;
        		this.nextPosition.z = player.position.z-(35+(Math.random()*5));
        	} else if(chance < 0.5) {
        		this.nextPosition.x = player.position.x+(Math.random()*30)-15;
        		this.nextPosition.z = player.position.z+(15+(Math.random()*5));
        	} else if(chance < 0.75) {
        		this.nextPosition.x = player.position.x-(25+(Math.random()*5));
        		this.nextPosition.z = player.position.z+(Math.random()*30)-15;
        	} else {
        		this.nextPosition.x = player.position.x+(25+(Math.random()*5));
        		this.nextPosition.z = player.position.z+(Math.random()*30)-15;
        	}
        	this.applyNextMove();
        	age = 0;
        	npcHeadMaterial.opacity = 1
        	npcBodyMaterial.opacity = 1
        } else {
			dir.x = player.position.x - this.position.x;
			dir.z = player.position.z - this.position.z;
			dir.normalize();

			if(!this.healed) {
				this.nextPosition.x += dir.x * tick * (speed-speedSeed);
				this.nextPosition.z += dir.z * tick * (speed-speedSeed);
			} else {
				this.nextPosition.x -= dir.x * tick * (speed-speedSeed);
				this.nextPosition.z -= dir.z * tick * (speed-speedSeed);
			}
		}

		if(!this.healed) {
			bodyMesh.rotation.y = angleToPlayer;
			headMesh.rotation.y = angleToPlayer;
		} else {
			bodyMesh.rotation.y = angleToPlayer+Math.PI;
			headMesh.rotation.y = angleToPlayer+Math.PI;
		}
	}
	var diff = new THREE.Vector3();

	this.applyNextMove= function() {
		this.position.copy(this.nextPosition);
		headMesh.position.copy(this.position);
		bodyMesh.position.copy(this.position);
		headMesh.position.y -= (bounce/2);
		if(this.healed) {
			headMesh.position.y += 0.5;
		}
		bodyMesh.position.y += bounce;
	}

	this.heal = function() {
		if(!this.healed) {
			this.healed = true;

			if(Math.random() < 0.2) {
				npcHeadMaterial.map = healedHeadTexture3;
				npcBodyMaterial.map = healedBodyTexture4;
			} else {
				npcHeadMaterial.map = headTexture;
				if(Math.random() < 0.33) {
					npcHeadMaterial.map = healedHeadTexture;
				} else if(Math.random() < 0.33) {
					npcHeadMaterial.map = healedHeadTexture2;
				}

				npcBodyMaterial.map = healedBodyTexture1;
				if(Math.random() < 0.33) {
					npcBodyMaterial.map = healedBodyTexture2;
				} else if(Math.random() < 0.33) {
					npcBodyMaterial.map = healedBodyTexture3;
				}
			}

		}
	}

	this.applyNextMove();

}
