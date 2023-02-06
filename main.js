import { config } from "./config.js"

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gridSize;

//Load Sounds
var deathSound = new Audio('Death.mp3');
var backgroundMusic = new Audio('Song.mp3');

window.addEventListener("load", () => {
    scale()
    snake.reset()
    food.replenish()
    draw()
});

function scale() {
    gridSize = canvas.getBoundingClientRect().width/config.x
    canvas.width = config.x*gridSize;
    canvas.height = config.y*gridSize;
}

var snake = {
    reset : function() {
        this.vx = 1
        this.vy = 0
        this.length = 3
        this.body = []
        this.alive = true
        this.color = [160, 100, 50]
        for(let i = 0; i < this.length; i++){
            this.body[i] = [i,0]
        }
        this.body.reverse()
    },
    move : function() {
        if (this.alive) {
            if (this.body.length == this.length) {
                this.body.pop()
            }
            this.body.unshift([this.body[0][0] + this.vx, this.body[0][1] + this.vy])
        }
    },
    collision : function() {
        let sx = this.body[0][0] + this.vx
        let sy = this.body[0][1] + this.vy
        if (sx < 0 || sx > config.x-1 || sy < 0 || sy > config.y-1 || contain(this.body, [sx,sy])) {
            this.alive = false;
            this.color = [0, 100, 50]
            death()
        }
        if(contain(food.food, [sx-this.vx, sy-this.vy])) {
            this.length += 1;
            for(let i = 0; i < food.food.length; i++) {
                if(compare(food.food[i], [sx-this.vx, sy-this.vy])){
                    food.food.splice(i, 1)
                }
            }
            food.replenish()
        }
    },
    draw : function() {
        for(let i = 0; i < this.body.length; i++) {
            var color = `hsl(
                ${this.color[0]},
                ${this.color[1]}%,
                ${this.color[2]-i}%`;
            block(this.body[i][0], this.body[i][1], color)
        }
    }
}

var food = {
    food : [],
    replenish : function() {
        while(this.food.length < config.foodAmount - Math.max(0, (config.foodAmount+snake.length-1) - (config.x*config.y))) {
            var newFood = [Math.floor(Math.random() * config.x), Math.floor(Math.random() * config.y)]
            if(!contain(this.food, newFood) && !contain(snake.body, newFood)){
                this.food.push(newFood)
            }
        }
    },
    draw : function() {
        for(let i = 0; i < this.food.length; i++) {
            block(this.food[i][0], this.food[i][1], "#ff0000")
        }
    }
}


function draw(){
    clear()
    food.draw()
    snake.collision()
    snake.move()
    snake.draw()
    
    if (snake.alive){
        setTimeout(draw, 500/config.speed)
    }
}

function contain(main, sub){
    for(let i = 0; i < main.length; i++){
        if (JSON.stringify(main[i]) == JSON.stringify(sub)) {
            return true
        }
    }
    return false
}

function compare(a, b){
    return a.toString() === b.toString()
}

function block(x, y, color) {
    ctx.beginPath()
    ctx.roundRect(x*gridSize, y*gridSize, gridSize, gridSize) //[20, 20, 20, 20]
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

function death() {
    death.currentTime = 0;
    deathSound.play()

    //Black sqaure
    ctx.beginPath()
    ctx.fillStyle = "#000000"
    ctx.rect(0, canvas.height/2 - canvas.height/8, canvas.width, canvas.height/4)
    ctx.fill()
    
    //Red text
    ctx.font = `${gridSize}px serif`;
    ctx.fillStyle = "#ff0000"
    ctx.textAlign = "center"
    ctx.fillText("YOU DIED", canvas.width/2, canvas.height/2 + gridSize/3);
    ctx.closePath()
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
    if (Event.key == " ") {
        snake.reset()
        food.food = []
        food.replenish()
        scale()
        draw()
    }
})