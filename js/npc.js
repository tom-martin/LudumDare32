var npcHeadTexture = THREE.ImageUtils.loadTexture( "textures/zombieHead.png" );
npcHeadTexture.magFilter = THREE.NearestFilter;

var npcHeadTexture2 = THREE.ImageUtils.loadTexture( "textures/zombieHead2.png" );
npcHeadTexture2.magFilter = THREE.NearestFilter;

var npcBodyTexture = THREE.ImageUtils.loadTexture( "textures/zombieBody.png" );
npcBodyTexture.magFilter = THREE.NearestFilter;

var npcBodyTexture2 = THREE.ImageUtils.loadTexture( "textures/zombieBody2.png" );
npcBodyTexture2.magFilter = THREE.NearestFilter;

function Npc(scene) {
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
	var speed = 5-Math.random();

	var maxAge = 10;

	var age = Math.random()*maxAge;

	var bounce = Math.random();
	var bounceSpeed = 1.5;
	var maxBounce = 0.25;

	var forwardZ = new THREE.Vector3(0, 0, 1);

	var dir = new THREE.Vector3(0, 0, 0);
	this.update = function(player, tick) {
		this.nextPosition.copy(this.position);

		age += tick;

		if(age > (maxAge-1)) {
			npcHeadMaterial.opacity = 1-(age-(maxAge-1));
			npcBodyMaterial.opacity = 1-(age-(maxAge-1));
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
        
        if(age > maxAge) {
        	var chance = Math.random();
        	if(chance < 0.25) {
        		this.nextPosition.x = player.position.x+(Math.random()*30)-15;
        		this.nextPosition.z = player.position.z-(35+(Math.random()*5));
        	} else if(chance < 0.5) {
        		this.nextPosition.x = player.position.x+(Math.random()*30)-15;
        		this.nextPosition.z = player.position.z+(10+(Math.random()*5));
        	} else if(chance < 0.75) {
        		this.nextPosition.x = player.position.x-(15+(Math.random()*5));
        		this.nextPosition.z = player.position.z+(Math.random()*30)-15;
        	} else {
        		this.nextPosition.x = player.position.x+(15+(Math.random()*5));
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
			this.nextPosition.x += dir.x * tick * speed;
			this.nextPosition.z += dir.z * tick * speed;
		}

		bodyMesh.rotation.y = angleToPlayer;
		headMesh.rotation.y = angleToPlayer;
	}
	var diff = new THREE.Vector3();

	this.applyNextMove= function() {
		this.position.copy(this.nextPosition);
		headMesh.position.copy(this.position);
		bodyMesh.position.copy(this.position);
		headMesh.position.y -= (bounce/2);
		bodyMesh.position.y += bounce;
	}
}
