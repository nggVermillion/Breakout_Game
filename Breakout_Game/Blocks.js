/*
let frame, ctx;

function init(){
    frame = document.getElementById("frame");
    ctx.frame.getContext("2d");
}

document.addEventListener("DOMContentLoaded", init);
*/
class Block {
    width = 30;
    height = 15;
    fillStyle = "blue";
    x = 0;
    y = 0;
    ctx = null;
    constructor(x, y, ctx){
        //I can ensure that the Numbers get passed in as numbers 
        //with Number(x)
        this.x = Number(x); 
        this.y = Number(y);
        this.ctx = ctx;
    }

    get left(){
        return this.x;
    }

    get right(){
        return this.x + this.width;
    }

    get top(){
        return this.y;
    }

    get bottom(){
        return this.y + this.height;
    }

    draw(){
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

module.exports = Block;
