function casement(id){
	this.id = id;
	this.zoom_y = 1;
	this.zoom_x = 1;
	this.zoom_z = 1;
	this.position = new position(0,0,0);
	this.test = "aa";
	this.mesh;
	this.windowType = "normal";
};
casement.prototype.setPosition = function(posi) {
	this.position = posi;
};
casement.prototype.setSize = function(x,y,z) {
	this.zoom_x = x;
	this.zoom_y = y;
	this.zoom_z = z;
};
casement.prototype.draw = function() {

	var loader = new THREE.JSONLoader();
	// console.log("in draw " + this.position);
	var objUrl = './models/window1.json';
	switch(this.windowType){
		case "dangerous":objUrl = './models/window1.json';break;
		case "normal":objUrl = './models/window2.js';break;
	}
    loader.load(objUrl, function (geometry, mat) {
        this.mesh = new THREE.Mesh(geometry, mat[0]);

        this.mesh.scale.x = 1;
        this.mesh.scale.y = 1;
        this.mesh.scale.z = 1;

        this.mesh.position.x = this.position.x;
        this.mesh.position.y = this.position.y;
        this.mesh.position.z = this.position.z;

        scene.add(this.mesh);

    }.bind(this), './models/');
};
casement.prototype.setX = function(x) {
	this.position.x = x;
};
casement.prototype.setY = function(y) {
	this.position.y = y;
};
