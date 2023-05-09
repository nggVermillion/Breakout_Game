const frame = document.getElementById("frame");

const ctx = frame.getContext("2d");

ctx.fillStyle = "red";
//x, y, width, height
var x = 120;
ctx.fillRect(x,140,50,5);

//position the canvas blocks

const drawBlock = (x, y) => {
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, 25, 5);
}

var y = 5;
for(var i = 1; i<4; i++){
    var x = 15;
    for(var j = 0; j<9; j++){
        drawBlock(x, y);
        x += 30;
    }
    y += 10;
}
