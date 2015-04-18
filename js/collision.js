function Collision() {
	var diff = new THREE.Vector3();

	function doEntityStaticCollision(e, statics, tick, collisionSpeed) {
		for(var i in statics) {
			var stat = statics[i];

			var eLeft = e.nextPosition.x - 0.5;
			var eRight = e.nextPosition.x + 0.5;
			var eBack = e.nextPosition.z-0.5;
			var eFront = e.nextPosition.z+0.5;

			var sLeft = stat.position.x - (stat.width/2);
			var sRight = stat.position.x + (stat.width/2);
			var sBack = stat.position.z-(stat.width/2);
			var sFront = stat.position.z+(stat.width/2);

			if(!(eRight < sLeft ||
				 eLeft > sRight ||
				 eFront < sBack ||
				 eBack > sFront)) {
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

	this.update = function(player, npcs, statics, tick) {
		for(var i in npcs) {
	        var npc = npcs[i];
	        
	        doEntityEntityCollision(npc, player, tick, 7);
	        
	        for(var j = Number(i)+1; j < npcs.length; j++) {
	            var otherNpc = npcs[j];
	            doEntityEntityCollision(npc, otherNpc, tick, 3);
	        }

	        doEntityStaticCollision(npc, statics);

	        npc.applyNextMove();
    	}

    	doEntityStaticCollision(player, statics);

    	player.applyNextMove();
	}	
}