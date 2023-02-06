import { config } from "./config.js"

//Get canvas element
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gridSize;

//Load Sounds
var deathSound = new Audio('Death.mp3');
var backgroundMusic = new Audio('Song.mp3');

//Starts functions
window.addEventListener("load", () => {
    scale()
    snake.reset()
    food.replenish()
    draw()
});

//Scales canvas
function scale() {
    gridSize = canvas.getBoundingClientRect().width/config.x
    canvas.width = config.x*gridSize;
    canvas.height = config.y*gridSize;
}

var snake = {
    //Start variables for snake
    reset : function() {
        this.vx = 1
        this.vy = 0
        this.length = 3
        this.body = []
        this.alive = true
        this.color = [160, 100, 50]
        //Fills snake body
        for(let i = 0; i < this.length; i++){
            this.body[i] = [i,0]
        }
        //Reverses so snake move right at start
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
        let sx = this.body[0][0] + this.vx //Next x
        let sy = this.body[0][1] + this.vy //Next y
        //Collision with wall and self
        if (sx < 0 || sx > config.x-1 || sy < 0 || sy > config.y-1 || contain(this.body, [sx,sy])) {
            this.alive = false;
            this.color = [0, 100, 50]
            death()
        }
        //Collision with food
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
    //Draws snake
    draw : function() {
        for(let i = 0; i < this.body.length; i++) {
            //Changes color every sqaure
            var color = `hsl(
                ${this.color[0]},
                ${this.color[1]}%,
                ${this.color[2]-i}%`;
            block(this.body[i][0], this.body[i][1], color)
        }
    }
}

//Food variable
var food = {
    food : [], //Holds x,y coordinates for food
    //Function used to fill up food array
    replenish : function() {
        //Checks if there is space to generate food
        while(this.food.length < config.foodAmount - Math.max(0, (config.foodAmount+snake.length-1) - (config.x*config.y))) {
            //Genererates new food
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

//Main game loop
function draw(){
    if (snake.alive){
        clear()
        snake.collision()
        food.draw()
        snake.move()
        snake.draw()
    }
    setTimeout(draw, 500/config.speed)
}

//Checks if array is contained in other array
function contain(main, sub){
    for(let i = 0; i < main.length; i++){
        if (JSON.stringify(main[i]) == JSON.stringify(sub)) {
            return true
        }
    }
    return false
}

//Compares to arrays
function compare(a, b){
    return a.toString() === b.toString()
}

//Draws a block on x,y with a specified color
function block(x, y, color) {
    ctx.beginPath()
    ctx.roundRect(x*gridSize, y*gridSize, gridSize, gridSize) //[20, 20, 20, 20]
    ctx.fillStyle = color;
    ctx.fill()
    ctx.closePath()
}

//Clears gameboard
function clear(){
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "white";
    ctx.fill()
    ctx.closePath();
}

//Draws death screen and plays sound
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

//Eventlistenners for key input
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
    }
})