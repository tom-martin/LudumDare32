function Spray(scene) {
	var sprayMaterial = new THREE.MeshLambertMaterial( {color: 0x60ddff, transparent: true, opacity: 0.9 } );
	var sprayMeshes = [];
	var sprayLength = 0;
	var maxSprayLength = 7;
	var sprayLengthSq = sprayLength*sprayLength;
	var sprayProgress = [];
	var sprayAngles = [];


	var diff = new THREE.Vector3();
	var up = new THREE.Vector3(0, 1, 0);
	var sprayAngle = Math.PI/1.8;
	var halfSprayAngle = sprayAngle/2;
	this.spraying = false;
	var sprayPushSpeed = 10;
	var npcDiff = new THREE.Vector3();

	var forwardZ = new THREE.Vector3(0, 0, 1);
	var forwardX = new THREE.Vector3(1, 0, 0);

	this.waterLevel = 1;
	var waterLevelLossSpeed = 0.4;
	var waterLevelGainSpeed = 0.2;
	var waterLevelAntidoteBonus = 5;
	var waterExpiredTime = 0;

	this.rotationForPlayer = 0;

	for(var i = 0; i < 300; i++) {
		// var sprayGeometry = new THREE.BoxGeometry(0.5+Math.random(), 0.5+Math.random(), 0.5+Math.random() );
		var sprayGeometry = new THREE.SphereGeometry( 0.25+Math.random()/2);
		var sprayMesh = new THREE.Mesh( sprayGeometry, sprayMaterial );
		sprayMeshes.push(sprayMesh);
		scene.add(sprayMesh);
		sprayProgress[i] = Math.random();
		sprayAngles[i] = (Math.random()*sprayAngle)-halfSprayAngle;
	}

	this.update = function(threeCamera, player, npcs, input, now, tick) {
		var timeSinceWaterExpired = now - waterExpiredTime;
		this.spraying = input.mouseDown && this.waterLevel > 0 && timeSinceWaterExpired > 1000;

		if(player.hasAntidote) {
			sprayMaterial.color.setHex(0xff00ff);
		}

		var mouseGroundPos = input.getMouseGroundPosition(threeCamera);
		diff.copy(mouseGroundPos).sub(player.position);
		diff.normalize();
		this.rotationForPlayer = diff.angleTo(forwardZ);
		if(diff.x < 0) {
			this.rotationForPlayer = -this.rotationForPlayer;
		}

		if(this.spraying) {
			spraySound.volume = 0.2;
    		spraySound.play();
			this.waterLevel -= tick*waterLevelLossSpeed;
			if(this.waterLevel < 0) {
				waterExpiredTime = now;
				this.waterLevel = 0;
			}
			if(sprayLength < maxSprayLength) {
				sprayLength+=(tick*sprayPushSpeed);
				sprayLength = Math.min(maxSprayLength, sprayLength);
				sprayLengthSq = sprayLength*sprayLength;
			}

			var particleSprayLength = sprayLength-2;
			
			for(var i in sprayMeshes) {
				var sprayMesh = sprayMeshes[i];
				sprayProgress[i] += tick;
				if(sprayProgress[i] > 1) {
					sprayProgress[i] = 0;
				}
				sprayMesh.visible = true;
				sprayMesh.position.copy(diff);
				sprayMesh.position.applyAxisAngle(up, sprayAngles[i]+((1-sprayProgress[i])/5));
				sprayMesh.position.multiplyScalar(2+(particleSprayLength*sprayProgress[i]));
				sprayMesh.position.add(player.position);
			}
			var sprayAngleToZ = diff.angleTo(forwardZ);
			var sprayAngleToX = diff.angleTo(forwardX);

			for(var i in npcs) {
				var npc = npcs[i];
				if(Math.abs(npc.nextPosition.x-player.nextPosition.x)<sprayLength &&
					Math.abs(npc.nextPosition.z-player.nextPosition.z)<sprayLength) {
					npcDiff.copy(npc.nextPosition);
					npcDiff.sub(player.position);
					if(npcDiff.lengthSq() < sprayLengthSq) {
						var angleToZ = npcDiff.angleTo(forwardZ);
						var angleToX = npcDiff.angleTo(forwardX);
						if(Math.abs(sprayAngleToZ-angleToZ) < halfSprayAngle &&
						   Math.abs(sprayAngleToX-angleToX) < halfSprayAngle) {
							if(player.hasAntidote) {
								npc.heal();
							} else {
								npc.nextPosition.x += npcDiff.x*tick*sprayPushSpeed;
								npc.nextPosition.z += npcDiff.z*tick*sprayPushSpeed;
							}
						}
					}
				}
			}
		} else {
			spraySound.pause();
			spraySound.currentTime = 0;
			var waterAddition = tick*waterLevelGainSpeed;
			if(player.hasAntidote) {
				waterAddition*=waterLevelAntidoteBonus;
			}
			this.waterLevel += waterAddition;
			
			if(this.waterLevel > 1) {
				this.waterLevel = 1;
			}
			sprayLength = 1;
			for(var i in sprayMeshes) {
				var sprayMesh = sprayMeshes[i];
				sprayMesh.visible = false;
			}
		}
	}
}