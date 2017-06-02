function people(){
	this.zoom_y = 1;
	this.zoom_x = 1;
	this.zoom_z = 1;
	this.position = new position(0,0,1.5);
	this.mesh;
	this.moveSpeed = 0.04;
	this.side = 4;

	this.colliderBoxSide = 0.6;
};
people.prototype.norupdate = function() {
	this.mesh.rotation.y+=0.05;
};
people.prototype.controlUpdate = function(toward) {
	if(this.mesh.position.x <= this.side&&this.mesh.position.x >= -this.side ) {
		var towardX = this.moveSpeed*toward;
		this.setPosition(new position(this.position.x+towardX,this.position.y,this.position.z));
	}else if(this.mesh.position.x >= this.side){
		this.setPosition(new position(this.position.x-0.01,this.position.y,this.position.z));
	}else if(this.mesh.position.x <= -this.side){
		this.setPosition(new position(this.position.x+0.01,this.position.y,this.position.z));
	}
};
people.prototype.setPosition = function(posi) {
	this.position = posi;
	this.mesh.position.x = this.position.x;
	this.mesh.position.y = this.position.y;
	this.mesh.position.z = this.position.z;
};
people.prototype.draw = function(scene) {

	var loader = new THREE.OBJLoader();
	loader.load('./models/aiyinsitan.obj', function (loadedMesh) {
		var material = new THREE.MeshLambertMaterial({color: Colors.white});

		// loadedMesh is a group of meshes. For
		// each mesh set the material, and compute the information
		// three.js needs for rendering.
		loadedMesh.children.forEach(function (child) {
			child.material = material;
			child.geometry.computeFaceNormals();
			child.geometry.computeVertexNormals();
		});
		this.mesh = loadedMesh;
		loadedMesh.scale.set(0.4, 0.4, 0.4);
		loadedMesh.position.set(this.position.x, this.position.y, this.position.z);
		loadedMesh.rotation.z = Math.PI;

		scene.add(this.mesh);
	}.bind(this));
};