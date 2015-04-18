function Collision() {
	var diff = new THREE.Vector3();

	function doEntityEntityCollision(e1, e2, tick, collisionSpeed) {
		if(e1.position.distanceToSquared(e2.nextPosition) <= 1) {
            diff.copy(e1.nextPosition);
            diff.sub(e2.nextPosition);
            diff.negate();
            diff.normalize();
            e1.nextPosition.x -= (diff.x * tick * collisionSpeed);
            e1.nextPosition.z -= (diff.z * tick * collisionSpeed);

            e2.nextPosition.x += (diff.x * tick * collisionSpeed);
            e2.nextPosition.z += (diff.z * tick * collisionSpeed);
        }
	}

	this.update = function(player, npcs, tick) {
		for(var i in npcs) {
	        var npc = npcs[i];
	        
	        doEntityEntityCollision(npc, player, tick, 7);
	        
	        for(var j = Number(i)+1; j < npcs.length; j++) {
	            var otherNpc = npcs[j];
	            doEntityEntityCollision(npc, otherNpc, tick, 3);
	        }

	        npc.applyNextMove();
    	}

    	player.applyNextMove();
	}	
}