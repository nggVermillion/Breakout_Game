//instantiate the screen
let frame, ctx;
let player = null;
let ball = null;
let score = 0;

function init(){
    frame = document.getElementById("frame");
    ctx = frame.getContext("2d");
    frame.width = 400;
    frame.height = 400;
    ctx.fillStyle = "blue";
    player = new Player(ctx);
    ball = new Ball(ctx);
    instantiateBlocks(ctx);
    instantiatePlayer();
    instantiateBall();

    gameLoop();
}

//instantiate the block player and ball

//add the blocks to the dict so we can reuse them later on more easily
let blocks = [];

function instantiateBlocks(ctx){
    var y = 15;
    for(var i = 1; i<4; i++){
        var x = 20;
        for(var j = 0; j<9; j++){
            const newBlock = new Block(x, y, ctx);
            blocks.push(newBlock);
            newBlock.draw();
            x += 40;
        }
        y += 30;
    }
}

function instantiatePlayer(){
    player.draw();
}

function instantiateBall(){
    ball.draw();
}

function drawScore(){
    ctx.font = "15px serif";
    ctx.fillText("Score: ", 340, 396);
    ctx.fillText(score.toString(), 380, 396);
}

//make the games "player" listen to -> and <-


document.addEventListener("keydown", function(event){
    if(event.key === "ArrowLeft"){
        player.update(-5);
    }else if(event.key === "ArrowRight"){
        player.update(5);
    }
});


// for each move of the ball check if its in the range of a block
//by iterating over the y keys -> if one is a hit, iterate over the accoring x values
//check if in range of any of the x values -> if yes recalulate the the direction the ball moves 
//and remove the according block

function drawBlocks() {
    for(var i = 0; i<blocks.length; i++){
        blocks[i].draw();
    }
}

function updateBall(){
    ball.update();
}

function reset(){
    score = 0;
    ctx.clearRect(0, 0, frame.width, frame.height);
    blocks = [];
    instantiateBlocks(ctx);
    player.reset();
    instantiatePlayer();
    ball.reset();
    instantiateBall();
}


function gameLoop(){
    window.requestAnimationFrame(gameLoop);

    ctx.clearRect(0, 0, frame.width, frame.height);

    drawBlocks();
    player.draw();
    ball.draw();
    drawScore();

    updateBall();
}


//define the classes down here because i couldnt manage to get it to work
//when they are in another file

class Ball {
    x = 200;
    y = 370;
    radius = 5;
    fillStyle = "red";
    ctx;
    speed = 5;
    currentXDirection = 1;
    currentYDirection = -4;
    constructor(ctx){
        this.ctx = ctx;
    }

    reset(){
        this.speed = 5;
        this.currentXDirection = 1;
        this.currentYDirection = -4;
        this.x = 200;
        this.y = 370;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getRadius(){
        return this.radius;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.ctx.fillStyle = "fillStyle";
        this.ctx.fill();
        this.ctx.closePath();
    }

    update(){
        if(ball.checkPlayerCollision()){
            this.currentYDirection = (-1)*this.currentYDirection;
        }else if(ball.checkBlockCollision()){
            return;
        }else{
            if(this.x<8){
                this.currentXDirection = (-1)*this.currentXDirection;
            }else if(this.x>392){
                this.currentXDirection = (-1)*this.currentXDirection;
            }
            if(this.y<8){
                this.currentYDirection = (-1)*this.currentYDirection;
            }else if(this.y>player.getBottom()){
                reset();
                return;
            }
        }
        
        this.x += this.currentXDirection;
        this.y += this.currentYDirection;

    }

    checkBlockCollision(){
        for(var i = 0; i<blocks.length; i++){
            const b = blocks[i];
            var mid = b.getMid();
            //cover case if ball approaches from bottom or top
            if((this.y < mid && this.y >= mid - this.radius) && (this.x >= b.getLeft() && this.x <= b.getRight())){
                this.fromTop(b, i);
                return true;
            }else if((this.y > mid && this.y <= mid + this.radius) && (this.x >= b.getLeft() && this.x <= b.getRight())){
                this.fromBottom(b, i);
                return true;
            }
        }
        return false;
    }

    checkPlayerCollision(){
        if(this.x <= player.getRight() && this.x >= player.getLeft()){
            if(this.y>=(player.getTop()-this.radius) && this.y <= player.getBottom()){
                return true;
            }
        }
        return false;
    }
    //cover different scenarios from what angle the ball could approach the block

    fromBottom(block, index) {
        this.currentYDirection = Math.abs(this.currentYDirection);
        score += 1;
        blocks.splice(index, 1);
    }
    
    fromTop(block, index) {
        this.currentYDirection = -(Math.abs(this.currentYDirection));
        score += 1;
        blocks.splice(index, 1);
    }
}


class Block {
    width = 30;
    height = 8;
    fillStyle = "blue";
    x = 0;
    y = 0;
    ctx;
    constructor(x, y, ctx){
        //I can ensure that the Numbers get passed in as numbers 
        //with Number(x)
        this.x = Number(x); 
        this.y = Number(y);
        this.ctx = ctx;
    }

    getLeft(){
        return this.x;
    }

    getRight(){
        return (this.x + this.width);
    }

    getTop(){
        return this.y;
    }

    getBottom(){
        return this.y + this.height;
    }

    getMid(){
        return this.y-(this.height/2);
    }

    draw(){
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Player{
    x = 175;
    y = 380;
    width = 50;
    height = 5;
    fillStyle = "blue";
    ctx;
    constructor(ctx){
        this.ctx = ctx;
    }

    reset(){
        this.x = 175;
        this.y = 380;
    }

    getLeft(){
        return this.x;
    }

    getRight(){
        return this.x + this.width;
    }

    getTop(){
        return this.y;
    }

    getBottom(){
        return this.y + this.height;
    }

    draw(){
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(x){
        this.x += x;
    }
}
document.addEventListener("DOMContentLoaded", init);
