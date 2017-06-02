var speedLeval = [{
    score:0,
    speed:0.02
},{
    score:5,
    speed:0.03
},{
    score:40,
    speed:0.05
},{
    score:60,
    speed:0.05
},{
    score:80,
    speed:0.05
},{
    score:100,
    speed:0.05
},{
    score:150,
    speed:0.05
},{
    score:200,
    speed:0.05
}]
var scene,camera,webGLRenderer,render;
var proceGame = false;
var floorUpdateSpeed = 0.02;
var GAMESCORE = 0,SHOWLOG="";
// GAMESTATE : 0-未开始游戏 1-正在游戏 2-gameover
var player,GAMESTATE=0;
//COLORS
var Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xF5986E,
    brownDark:0x23190f,
    blue:0x68c3c0,
    grey:0x9f9f9f,
};

function loadScene(){
    scene = new THREE.Scene();

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // position and point the camera to the center of the scene
    camera.position.x = 0;
    camera.position.y = 2;
    camera.position.z = 8;
    camera.lookAt(new THREE.Vector3(0, 0, 1.5));

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 50, 30);
    spotLight.intensity = 2;
    scene.add(spotLight);
    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);
}
var floors = new Array();
function loadFloors(){
    for(var i = 0;i < 4;i++){
        var fl = new floor((i-4)*3);
        floors.push(fl);
    }
    for(var i in floors){
        floors[i].draw(scene);
    }
}
function loadPlayer(){
    player = new people();
    player.draw(scene);

}

function begin(){
    loadScene();
    loadFloors();
    loadPlayer();

    document.onmousemove = function (e) {playerMouseMove(e)};
    render();
}

function render() {
    if(proceGame){
        sysUpdate();
    }
    // render using requestAnimationFrame
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
}
// update
function sysUpdate(){
    checkStatus();
    setUpdateSpeed();
    // console.log(floorUpdateSpeed);
    for(var i = 0;i < floors.length;i++){
        floors[i].update(floorUpdateSpeed);
    }
    player.norupdate();
    checkColle();
    cameraUpdate();
}
function checkStatus(){
    switch(GAMESTATE){
        case 0:
            SHOWLOG = "";
            document.getElementById("show").innerHTML=SHOWLOG;
        break;
        case 1:
            SHOWLOG = "";
            document.getElementById("show").innerHTML=SHOWLOG;
        break;
        case 2:
            SHOWLOG = "GAME OVER!";
            document.getElementById("show").innerHTML=SHOWLOG;
        break;
    }
}
function cameraUpdate(){
    camera.lookAt(new THREE.Vector3(player.position.x, player.position.y, player.position.z));
    // console.log(player.position.x+ player.position.y+ player.position.z);
}
var premousex,playerMoveTowards=0;
function playerMouseMove(e){
    if(!proceGame) return;
    e=e? e:window.event;
    if(e.screenX>premousex){
        playerMoveTowards=1;
    }else if(e.screenX==premousex){
        playerMoveTowards=0;
    }else{
        playerMoveTowards=-1;
    }
    premousex = e.screenX;
    player.controlUpdate(playerMoveTowards);
    cameraUpdate();
}

// 碰撞检测
function checkColle(){
    for(var i = 0;i < floors.length;i++){
        for(var j = 0;j < floors[i].windows.length;j++){
            if(floors[i].dangerousIds.indexOf(floors[i].windows[j].id) != -1){
                var theWindow = floors[i].windows[j];
                if((player.position.x-player.colliderBoxSide/2 < theWindow.position.x+theWindow.zoom_x/2) && (player.position.x+player.colliderBoxSide/2 > theWindow.position.x-theWindow.zoom_x/2)){
                    if((player.position.y > theWindow.position.y-theWindow.zoom_y/2) && (player.position.y-player.colliderBoxSide < theWindow.position.y+theWindow.zoom_y/2)){
                        GAMESTATE=2;
                        proceGame = false;
                        SHOWLOG = "GAME OVER!";
                        document.getElementById("show").innerHTML=SHOWLOG;
                        document.getElementById("beginGame").style.display="inline-block";
                        document.getElementById("beginGame").style.zIndex="10";
                        documeng.getElementById("beginGame").innerHTML = "重新开始";
                    }
                }
            }
        }
    }
}

function setUpdateSpeed(){
    for(var i = 0;i < speedLeval.length;i++){
        if(GAMESCORE <= speedLeval[i].score){
            floorUpdateSpeed = speedLeval[i].speed;
            // console.log(speedLeval[i].speed);
            break;
        }
    }
}

//开始加载  
window.load = begin();

function clickBeginGame(){
    if(GAMESTATE==0){
        proceGame = true;
        GAMESTATE=1;
        document.getElementById("beginGame").style.display="none";
    }else if(GAMESTATE==2){
        proceGame = true;
        GAMESTATE=1;
        document.getElementById("beginGame").style.display="none";
        for(var i = 0;i < floors.length;i++){
            floors[i].setPositionY((i-4)*3);
            floors[i].resetWindow();
        }
        GAMESCORE=0;
        document.getElementById("scoreShow").innerHTML = GAMESCORE;
    }
}