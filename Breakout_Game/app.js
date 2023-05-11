//instantiate the screen
//instantiate the block
const block = require("./Blocks");
//instantiate the player
const frame = document.getElementById("frame");
const ctx = frame.getContext("2d");
frame.width = 400;
frame.height = 400;
ctx.fillStyle = "blue";
//x, y, width, height of player
var x_player = 175;
const y_player = 380;
const width_player = 50;
const height_player = 10;

var width_block = 30;
var height_block = 15;


ctx.fillRect(x_player, y_player, width_player, height_player);

//instantiate the blocks
let blocks = {};
const drawBlock = (x, y) => {
    if(y in blocks){
        blocks[y].push(x);
    }else {
        blocks[y] = [x];
    }
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, width_block, height_block);
}

var y_block = 15;
for(var i = 1; i<4; i++){
    var x = 20;
    for(var j = 0; j<9; j++){
        drawBlock(x, y_block);
        x += 40;
    }
    y_block += 30;
}

const ballRadius = 8;
var ballX = 200;
var ballY = 200;

ctx.beginPath();
ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();

//save blocks in a dict

function redrawBlocks(){
    for(const key in blocks){
        const xValues = blocks[key];
        for(var i = 0; i< xValues.length; i++){
            const x = xValues[i];
            ctx.fillStyle = "blue";
            //console.log(x);
            ctx.fillRect(x, key, width_block, height_block);
        }
    }
}

function drawPlayer(dx){
    ctx.clearRect(0, 0, frame.width, frame.height);

    x_player += dx;

    ctx.fillRect(x_player, y_player, width_player, height_player);

    redrawBlocks();

}

//make the games "player" listen to -> and <-

document.addEventListener("keydown", function(event){
    if(event.key === "ArrowLeft"){
        drawPlayer(-5);
    }else if(event.key === "ArrowRight"){
        drawPlayer(+5);
    }
});


// for each move of the ball check if its in the range of a block
//by iterating over the y keys -> if one is a hit, iterate over the accoring x values
//check if in range of any of the x values -> if yes recalulate the the direction the ball moves 
//and remove the according block

var gameOn = true;

while(gameOn){

}




