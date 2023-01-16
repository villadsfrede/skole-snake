var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var x = 10;
var y = 10;
var gridSize = 25

window.addEventListener("load", () => {
    canvas.width = x*gridSize;
    canvas.height = y*gridSize;
    
    snake.reset()
    draw()
});

var snake = {
    vx : 1,
    vy : 0,
    length: 3,
    body : [],
    reset : function() {
        this.body = []
        for(let i = 0; i < this.length; i++){
            this.body[i] = [i,0]
        }
        this.body.reverse()
    },
    move : function() {
        for(let i = 0; i < this.body.length; i++) {
            block(this.body[i][0], this.body[i][1], "#ff0000")
        }

        this.body.unshift([this.body[0][0] + this.vx, this.body[0][1] + this.vy])
        this.body.pop()
    }
}

function draw(){
    clear()
    snake.move()

    setTimeout(draw, 100)
}

function block(x, y, color) {
    ctx.beginPath()
    ctx.rect(x*gridSize, y*gridSize, gridSize, gridSize)
    ctx.fillStyle = color;
    ctx.fill()
    ctx.closePath()
}

function clear(){
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "white";
    ctx.fill()
    ctx.closePath();
}

document.addEventListener("keydown", (Event) => {
    if (Event.key == "ArrowLeft") {
        if (snake.vx != 1) {
            snake.vx = -1;
            snake.vy = 0;
        }
    }
    if (Event.key == "ArrowRight") {
        if (snake.vx != -1) {
            snake.vx = 1;
            snake.vy = 0;
        }
    }
    if (Event.key == "ArrowUp") {
        if (snake.vy != 1) {
            snake.vx = 0;
            snake.vy = -1;
        }
    }
    if (Event.key == "ArrowDown") {
        if (snake.vy != -1) {
            snake.vx = 0;
            snake.vy = 1;
        }
    }
})