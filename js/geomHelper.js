function GeomHelper() {
	this.createHeadGeom = function(geom, faceVertIndex, halfWidth, halfHeight, halfDepth) {
		var startY = 1;
		var startZ = 2/16;
		// TOP
		geom.vertices.push(new THREE.Vector3(-halfWidth, startY+halfHeight, startZ-halfDepth));
	    geom.vertices.push(new THREE.Vector3(-halfWidth, startY+halfHeight, startZ+halfDepth));
	    geom.vertices.push(new THREE.Vector3(halfWidth, startY+halfHeight, startZ+halfDepth));
    	geom.vertices.push(new THREE.Vector3(halfWidth, startY+halfHeight, startZ-halfDepth));
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+1, faceVertIndex+2));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(6/16, 1),new THREE.Vector2(6/16,12/16),new THREE.Vector2(10/16,12/16)]);
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+2, faceVertIndex+3));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(6/16, 1),new THREE.Vector2(10/16,12/16),new THREE.Vector2(10/16,1)]);
    	faceVertIndex+=4;

    	// BOTTOM
		geom.vertices.push(new THREE.Vector3(-halfWidth, startY-halfHeight, startZ-halfDepth));
	    geom.vertices.push(new THREE.Vector3(-halfWidth, startY-halfHeight, startZ+halfDepth));
	    geom.vertices.push(new THREE.Vector3(halfWidth, startY-halfHeight, startZ+halfDepth));
    	geom.vertices.push(new THREE.Vector3(halfWidth, startY-halfHeight, startZ-halfDepth));
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+2, faceVertIndex+1));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(6/16, 4/16),new THREE.Vector2(10/16,0),new THREE.Vector2(6/16,0)]);
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+3, faceVertIndex+2));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(6/16, 4/16),new THREE.Vector2(10/16,4/16), new THREE.Vector2(10/16,0)]);
    	faceVertIndex+=4;

    	// BACK
    	geom.vertices.push(new THREE.Vector3(-halfWidth, startY+halfHeight, startZ-halfDepth));
	    geom.vertices.push(new THREE.Vector3(halfWidth, startY-halfHeight, startZ-halfDepth));
	    geom.vertices.push(new THREE.Vector3(-halfWidth, startY-halfHeight, startZ-halfDepth));
    	geom.vertices.push(new THREE.Vector3(halfWidth, startY+halfHeight, startZ-halfDepth));
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+1, faceVertIndex+2));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(10/16, 12/16),new THREE.Vector2(6/16,8/16),new THREE.Vector2(10/16,8/16)]);
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+3, faceVertIndex+1));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(10/16, 12/16),new THREE.Vector2(6/16,12/16),new THREE.Vector2(6/16,8/16)]);
    	faceVertIndex+=4;

    	// FRONT
    	geom.vertices.push(new THREE.Vector3(-halfWidth, startY+halfHeight, startZ+halfDepth));
	    geom.vertices.push(new THREE.Vector3(halfWidth, startY-halfHeight, startZ+halfDepth));
	    geom.vertices.push(new THREE.Vector3(-halfWidth, startY-halfHeight, startZ+halfDepth));
    	geom.vertices.push(new THREE.Vector3(halfWidth, startY+halfHeight, startZ+halfDepth));
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+2, faceVertIndex+1));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(6/16, 8/16),new THREE.Vector2(6/16,4/16),new THREE.Vector2(10/16,4/16)]);
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+1, faceVertIndex+3));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(6/16, 8/16),new THREE.Vector2(10/16,4/16),new THREE.Vector2(10/16,8/16)]);
    	faceVertIndex+=4;

    	// LEFT
    	geom.vertices.push(new THREE.Vector3(-halfWidth, startY+halfHeight, startZ-halfDepth));
	    geom.vertices.push(new THREE.Vector3(-halfWidth, startY-halfHeight, startZ-halfDepth));
	    geom.vertices.push(new THREE.Vector3(-halfWidth, startY-halfHeight, startZ+halfDepth));
    	geom.vertices.push(new THREE.Vector3(-halfWidth, startY+halfHeight, startZ+halfDepth));
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+1, faceVertIndex+2));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(2/16, 8/16),new THREE.Vector2(2/16,4/16),new THREE.Vector2(6/16,4/16)]);
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+2, faceVertIndex+3));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(2/16, 8/16),new THREE.Vector2(6/16,4/16),new THREE.Vector2(6/16,8/16)]);
    	faceVertIndex+=4;

    	// RIGHT
    	geom.vertices.push(new THREE.Vector3(halfWidth, startY+halfHeight, startZ-halfDepth));
	    geom.vertices.push(new THREE.Vector3(halfWidth, startY-halfHeight, startZ-halfDepth));
	    geom.vertices.push(new THREE.Vector3(halfWidth, startY-halfHeight, startZ+halfDepth));
    	geom.vertices.push(new THREE.Vector3(halfWidth, startY+halfHeight, startZ+halfDepth));
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+2, faceVertIndex+1));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(14/16, 8/16),new THREE.Vector2(10/16,4/16),new THREE.Vector2(14/16,4/16)]);
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+3, faceVertIndex+2));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(14/16, 8/16),new THREE.Vector2(10/16,8/16),new THREE.Vector2(10/16,4/16)]);
    	faceVertIndex+=4;

		return faceVertIndex;
	}

	this.createBodyGeom = function(geom, faceVertIndex, halfWidth, halfHeight, halfDepth) {
		// TOP
		geom.vertices.push(new THREE.Vector3(-halfWidth, halfHeight, -halfDepth));
	    geom.vertices.push(new THREE.Vector3(-halfWidth, halfHeight, halfDepth));
	    geom.vertices.push(new THREE.Vector3(halfWidth, halfHeight, halfDepth));
    	geom.vertices.push(new THREE.Vector3(halfWidth, halfHeight, -halfDepth));
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+1, faceVertIndex+2));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(0, 1),new THREE.Vector2(0,12/16),new THREE.Vector2(8/16,12/16)]);
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+2, faceVertIndex+3));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(0, 1),new THREE.Vector2(8/16,12/16),new THREE.Vector2(8/16,1)]);
    	faceVertIndex+=4;

    	// BOTTOM
		geom.vertices.push(new THREE.Vector3(-halfWidth, -halfHeight, -halfDepth));
	    geom.vertices.push(new THREE.Vector3(-halfWidth, -halfHeight, halfDepth));
	    geom.vertices.push(new THREE.Vector3(halfWidth, -halfHeight, halfDepth));
    	geom.vertices.push(new THREE.Vector3(halfWidth, -halfHeight, -halfDepth));
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+2, faceVertIndex+1));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(0, 12/16),new THREE.Vector2(8/16,8/16),new THREE.Vector2(0,8/16)]);
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+3, faceVertIndex+2));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(0, 12/16),new THREE.Vector2(8/16,12/16),new THREE.Vector2(8/16,8/16)]);
    	faceVertIndex+=4;

    	// BACK
    	geom.vertices.push(new THREE.Vector3(-halfWidth, halfHeight, -halfDepth));
	    geom.vertices.push(new THREE.Vector3(halfWidth, -halfHeight, -halfDepth));
	    geom.vertices.push(new THREE.Vector3(-halfWidth, -halfHeight, -halfDepth));
    	geom.vertices.push(new THREE.Vector3(halfWidth, halfHeight, -halfDepth));
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+1, faceVertIndex+2));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(1, 1),new THREE.Vector2(8/16,8/16),new THREE.Vector2(1,8/16)]);
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+3, faceVertIndex+1));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(1, 1),new THREE.Vector2(8/16,1),new THREE.Vector2(8/16,8/16)]);
    	faceVertIndex+=4;

    	// FRONT
    	geom.vertices.push(new THREE.Vector3(-halfWidth, halfHeight, halfDepth));
	    geom.vertices.push(new THREE.Vector3(halfWidth, -halfHeight, halfDepth));
	    geom.vertices.push(new THREE.Vector3(-halfWidth, -halfHeight, halfDepth));
    	geom.vertices.push(new THREE.Vector3(halfWidth, halfHeight, halfDepth));
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+2, faceVertIndex+1));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(0, 8/16),new THREE.Vector2(0,0),new THREE.Vector2(8/16,0)]);
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+1, faceVertIndex+3));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(0, 8/16),new THREE.Vector2(8/16,0),new THREE.Vector2(8/16,8/16)]);
    	faceVertIndex+=4;

    	// LEFT
    	geom.vertices.push(new THREE.Vector3(-halfWidth, halfHeight, -halfDepth));
	    geom.vertices.push(new THREE.Vector3(-halfWidth, -halfHeight, -halfDepth));
	    geom.vertices.push(new THREE.Vector3(-halfWidth, -halfHeight, halfDepth));
    	geom.vertices.push(new THREE.Vector3(-halfWidth, halfHeight, halfDepth));
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+1, faceVertIndex+2));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(8/16, 8/16),new THREE.Vector2(8/16,0),new THREE.Vector2(12/16,0)]);
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+2, faceVertIndex+3));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(8/16, 8/16),new THREE.Vector2(12/16,0),new THREE.Vector2(12/16,8/16)]);
    	faceVertIndex+=4;

    	// RIGHT
    	geom.vertices.push(new THREE.Vector3(halfWidth, halfHeight, -halfDepth));
	    geom.vertices.push(new THREE.Vector3(halfWidth, -halfHeight, -halfDepth));
	    geom.vertices.push(new THREE.Vector3(halfWidth, -halfHeight, halfDepth));
    	geom.vertices.push(new THREE.Vector3(halfWidth, halfHeight, halfDepth));
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+2, faceVertIndex+1));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(12/16, 8/16),new THREE.Vector2(1,0),new THREE.Vector2(12/16,0)]);
    	geom.faces.push(new THREE.Face3(faceVertIndex, faceVertIndex+3, faceVertIndex+2));
    	geom.faceVertexUvs[0].push([new THREE.Vector2(12/16, 8/16),new THREE.Vector2(1,8/16),new THREE.Vector2(1,0)]);
    	faceVertIndex+=4;

		return faceVertIndex;
	}
}