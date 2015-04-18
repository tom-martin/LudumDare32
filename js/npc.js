var npcGeometry = new THREE.BoxGeometry( 1, 2, 1 );

function Npc(scene) {
	var npcMaterial = new THREE.MeshLambertMaterial( {color: 0x00ff00, transparent: true, opacity: 1.0} );
	var mesh = new THREE.Mesh( npcGeometry, npcMaterial );
	scene.add( mesh );
	this.position = new THREE.Vector3((Math.random()*500)-250, 0, (Math.random()*500)-250);
	this.nextPosition = new THREE.Vector3();
	var speed = 5-Math.random();

	var maxAge = 10;

	var age = Math.random()*maxAge;

	var dir = new THREE.Vector3(0, 0, 0);
	this.update = function(player, tick) {
		this.nextPosition.copy(this.position);

		age += tick;

		if(age > (maxAge-1)) {
			npcMaterial.opacity = 1-(age-(maxAge-1));
		}

		diff.copy(this.nextPosition);
        diff.sub(player.position);
        
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
        	npcMaterial.opacity = 1
        } else {
			dir.x = player.position.x - this.position.x;
			dir.z = player.position.z - this.position.z;
			dir.normalize();
			this.nextPosition.x += dir.x * tick * speed;
			this.nextPosition.z += dir.z * tick * speed;
		}
	}
	var diff = new THREE.Vector3();

	this.applyNextMove= function() {
		this.position.copy(this.nextPosition);
		mesh.position.copy(this.position);
		mesh.position.y += 1;
	}
}
