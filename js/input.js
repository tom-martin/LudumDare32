function Input() {
    var self = this;

    this.forwardDown = false;
    this.backwardDown = false;
    this.leftDown = false;
    this.rightDown = false;

    this.debugDown = false;


    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    this.mouseDown = false;

    this.onKeyChange = function(e, down) {
        if(e.keyCode==87) {
            self.forwardDown = down;
        }
        if(e.keyCode==83) {
            self.backwardDown = down;
        }
        if(e.keyCode==65) {
            self.leftDown = down;
        }
        if(e.keyCode==68) {
            self.rightDown = down;
        }
        if(e.keyCode==32) {
            self.debugDown = down;
            e.preventDefault();
        }
    }

    this.onMouseMove = function(e, down) {
        mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
    }

    this.onMouseChange = function(e, down) {
        self.mouseDown = down;
    }

    document.addEventListener("keydown", function(e) { self.onKeyChange(e, true); });
    document.addEventListener("keyup", function(e) { self.onKeyChange(e, false  ); });
    document.addEventListener("mousemove", function(e) { self.onMouseMove(e); });
    document.addEventListener("mouseup", function(e) { self.onMouseChange(e, false); });
    document.addEventListener("mousedown", function(e) { self.onMouseChange(e, true); });

    var dir = new THREE.Vector3(0, 0, 0);
    this.getDirection = function() {
        dir.set(0, 0, 0);
        if(self.forwardDown) {
            dir.z = -1;
        }
        if(self.backwardDown) {
            dir.z = 1;
        }
        if(self.leftDown) {
            dir.x = -1;
        }
        if(self.rightDown) {
            dir.x = 1;
        }

        dir.normalize();

        return dir;
    }

    var ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    var mouseGroundPos = new THREE.Vector3();
    this.getMouseGroundPosition = function(camera) {
        raycaster.setFromCamera(mouse, camera);
        return raycaster.ray.intersectPlane(ground, mouseGroundPos);
    }
}