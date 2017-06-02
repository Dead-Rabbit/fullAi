function floor(y){
	this.zoom_y = 3;
	this.zoom_x = 10;
	this.zoom_z = 2;
	this.position = new position(0,y,0);
	this.mesh;
	this.windows = new Array();
	this.number_window = 8;

	this.dangerousIds = [];

	this.gameTop = 2*this.zoom_y;
	this.gameBottom = -2*this.zoom_y
};
floor.prototype.update = function(speed) {
	this.moveUp(speed);
	if(this.mesh.position.y >= this.gameTop){
		this.resetFloor();
		GAMESCORE++;
		document.getElementById("scoreShow").innerHTML = GAMESCORE;
	}
};
// 运动方式，向上运动
floor.prototype.moveUp = function(dist) {
	this.setPositionY(this.mesh.position.y+dist);
};
// 重置楼层，包括Y值重建和窗户重建
floor.prototype.resetFloor = function() {
	this.setPositionY(this.gameBottom);
	for(var i = 0;i < this.windows.length;i++){
		scene.remove(this.windows[i].mesh);
	}
	this.windows = [];
	this.getNewDangerousIds();
	this.createWindows();
};
// 重置楼层，包括Y值重建和窗户重建
floor.prototype.resetWindow = function() {
	for(var i = 0;i < this.windows.length;i++){
		scene.remove(this.windows[i].mesh);
	}
	this.windows = [];
	this.dangerousIds = [];
	this.createWindows();
};
floor.prototype.draw = function(scene) {
	this.mesh = new THREE.Object3D();
 	this.mesh.name = "floor";
 	// Create the main body
	var geomCockpit = new THREE.BoxGeometry(this.zoom_x,this.zoom_y,this.zoom_z,1,1,1);
	var matCockpit = new THREE.MeshPhongMaterial({color:Colors.grey, shading:THREE.FlatShading});
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);
	this.mesh.position.x = this.position.x;
	this.mesh.position.y = this.position.y;
	this.mesh.position.z = this.position.z;
	// 绘制主体
	scene.add(this.mesh);
	this.drawWindows(scene);
	// this.testDraw();
};
// 绘制窗体
floor.prototype.drawWindows = function(scene) {
	this.createWindows();
};
//更改floor位置
floor.prototype.setPosition = function(posi) {
	this.mesh.position += posi;
	for(var i = 0;i < this.windows.length;i++){
		this.windows[i].mesh.position += posi;
	}
};
//更改floor y，向上运动
floor.prototype.setPositionY = function(posiY) {
	this.mesh.position.y = posiY;
	this.position.y = posiY;
	for(var i = 0;i < this.windows.length;i++){
		if(this.windows[i].mesh==null) return ;
		this.windows[i].mesh.position.y = posiY;
		this.windows[i].position.y = posiY;
	}
};
floor.prototype.getNewDangerousIds = function() {
	this.dangerousIds = [];
	for(var i = 0;i < this.number_window;i++){
		if(Math.random() * 8 > 6) 
			this.dangerousIds.push(i);
	}
};
// 初始化时创建重构窗体位置和大小
floor.prototype.createWindows = function() {
	// 向每个floor中存入窗户(写死，8个窗户)
	for(var i = 0;i < this.number_window;i++){
		console.log("create window" + i);
		var win = new casement(i);
		win.setPosition(new position(i-3.8+i*0.1 , this.position.y, 1));
		if(this.dangerousIds.indexOf(i) != -1) win.windowType = "dangerous";
		win.draw();
		this.windows.push(win);
	}
};