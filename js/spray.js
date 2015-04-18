function Spray(scene) {
	var sprayMaterial = new THREE.MeshLambertMaterial( {color: 0x60ddff, transparent: true, opacity: 0.7 } );
	var sprayMeshes = [];
	var sprayLength = 0;
	var maxSprayLength = 5;
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

	for(var i = 0; i < 100; i++) {
		var sprayGeometry = new THREE.BoxGeometry(0.5+Math.random(), 0.5+Math.random(), 0.5+Math.random() );
		var sprayMesh = new THREE.Mesh( sprayGeometry, sprayMaterial );
		sprayMeshes.push(sprayMesh);
		scene.add(sprayMesh);
		sprayProgress[i] = Math.random();
		sprayAngles[i] = (Math.random()*sprayAngle)-halfSprayAngle;
	}

	this.update = function(threeCamera, player, npcs, input, tick) {
		this.spraying = input.mouseDown;

		if(this.spraying) {
			if(sprayLength < maxSprayLength) {
				sprayLength+=(tick*sprayPushSpeed);
				sprayLength = Math.min(maxSprayLength, sprayLength);
				sprayLengthSq = sprayLength*sprayLength;
			}
			var mouseGroundPos = input.getMouseGroundPosition(threeCamera);
			diff.copy(mouseGroundPos).sub(player.position);
			diff.normalize();

			for(var i in sprayMeshes) {
				var sprayMesh = sprayMeshes[i];
				sprayProgress[i] += tick;
				if(sprayProgress[i] > 1) {
					sprayProgress[i] = 0;
				}
				sprayMesh.visible = true;
				sprayMesh.position.copy(diff);
				sprayMesh.position.applyAxisAngle(up, sprayAngles[i]);
				sprayMesh.position.multiplyScalar(1+(sprayLength*sprayProgress[i]));
				sprayMesh.position.add(player.position);
				sprayMesh.position.y+=1;
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
							npc.nextPosition.x += npcDiff.x*tick*sprayPushSpeed;
							npc.nextPosition.z += npcDiff.z*tick*sprayPushSpeed;
						}
					}
				}
			}
		} else {
			sprayLength = 0;
			for(var i in sprayMeshes) {
				var sprayMesh = sprayMeshes[i];
				sprayMesh.visible = false;
			}
		}
	}
}