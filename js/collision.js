function Collision() {
	var diff = new THREE.Vector3();

	function doEntityStaticCollision(e, statics, tick, collisionSpeed) {
		for(var i in statics) {
			var stat = statics[i];

			if(stat.inRange &&
			   !(e.nextPosition.x + 0.5 < stat.position.x - (stat.width/2) ||
				 e.nextPosition.x - 0.5 > stat.position.x + (stat.width/2) ||
				 e.nextPosition.z + 0.5 < stat.position.z - (stat.depth/2) ||
				 e.nextPosition.z - 0.5 > stat.position.z + (stat.depth/2))) {

				var eLeft = e.nextPosition.x - 0.5;
				var eRight = e.nextPosition.x + 0.5;
				var eBack = e.nextPosition.z-0.5;
				var eFront = e.nextPosition.z+0.5;

				var sLeft = stat.position.x - (stat.width/2);
				var sRight = stat.position.x + (stat.width/2);
				var sBack = stat.position.z-(stat.depth/2);
				var sFront = stat.position.z+(stat.depth/2);

				var leftDiff = Math.abs(sLeft - eRight);
				var rightDiff = Math.abs(sRight - eLeft);
				var frontDiff = Math.abs(sFront - eBack);
				var backDiff = Math.abs(sBack - eFront);

				var lowest = Math.min(leftDiff, rightDiff, frontDiff, backDiff);
				if(lowest == leftDiff) {
					e.nextPosition.x = sLeft-0.5;
				} else if(lowest == rightDiff) {
					e.nextPosition.x = sRight+0.5;
				} else if(lowest == backDiff) {
					e.nextPosition.z = sBack-0.5;
				} else if(lowest == frontDiff) {
					e.nextPosition.z = sFront+0.5;
				}

			}
		}
	}

	function doEntityEntityCollision(e1, e2, tick, collisionSpeed) {
		var collisionOccured = false;
		if(!(e1.nextPosition.x + 0.5 < e2.nextPosition.x - 0.5 ||
			 e1.nextPosition.x - 0.5 > e2.nextPosition.x + 0.5 ||
			 e1.nextPosition.z + 0.5 < e2.nextPosition.z - 0.5 ||
			 e1.nextPosition.z - 0.5 > e2.nextPosition.z + 0.5)) {
			if(e1.position.distanceToSquared(e2.nextPosition) <= 1) {
	            diff.copy(e1.nextPosition);
	            diff.sub(e2.nextPosition);
	            diff.negate();
	            diff.normalize();
	            e1.nextPosition.x -= (diff.x * tick * collisionSpeed);
	            e1.nextPosition.z -= (diff.z * tick * collisionSpeed);

	            e2.nextPosition.x += (diff.x * tick * collisionSpeed);
	            e2.nextPosition.z += (diff.z * tick * collisionSpeed);

	            collisionOccured = true;
	        }
	    }

	    return collisionOccured;
	}

	function updateInRangeFlag(thing, player) {
		diff.copy(thing.position);
        diff.sub(player.position);
        
        thing.inRange = Math.abs(diff.x) < 30 && Math.abs(diff.z) < 30;
	}

	this.update = function(player, npcs, statics, now, tick) {
		for(var i in npcs) {
			updateInRangeFlag(npcs[i], player);
		}

		for(var i in statics) {
			updateInRangeFlag(statics[i], player);
		}
		var playerCollided = false;
		for(var i in npcs) {
	        var npc = npcs[i];

	        diff.copy(npc.position);
	        diff.sub(player.position);
	        
	        if(npc.inRange) {
		        playerCollided |= doEntityEntityCollision(npc, player, tick, 7);
		        
		        for(var j = Number(i)+1; j < npcs.length; j++) {
		            var otherNpc = npcs[j];
		            if(otherNpc.inRange) {
		            	doEntityEntityCollision(npc, otherNpc, tick, 3);
		            }
		        }

		        doEntityStaticCollision(npc, statics);
		        npc.applyNextMove();
		    }
    	}

    	doEntityStaticCollision(player, statics);

    	player.applyNextMove();

    	if(playerCollided) {
    		player.takeDamage(now);
    	}
	}	
}