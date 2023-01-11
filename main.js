var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var x = 5;
var y = 5;
var gridSize = 25

window.addEventListener("load", () => {
    canvas.width = x*gridSize;
    canvas.height = y*gridSize;
});