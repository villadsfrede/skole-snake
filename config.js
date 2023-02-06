//Holds all eventlisteners for UI and start config

var config = {
    x : 10,
    y : 10,
    foodAmount : 1,
    speed : 1
}

document.getElementById("gridSmall").addEventListener("click", () => {
    config.x = 10
    config.y = 10
    removeClass("grid")
    document.getElementById("gridSmall").classList.add("control-active")
})

document.getElementById("gridMedium").addEventListener("click", () => {
    config.x = 20
    config.y = 20
    removeClass("grid")
    document.getElementById("gridMedium").classList.add("control-active")
})

document.getElementById("gridLarge").addEventListener("click", () => {
    config.x = 30
    config.y = 30
    removeClass("grid")
    document.getElementById("gridLarge").classList.add("control-active")
})

document.getElementById("foodSmall").addEventListener("click", () => {
    config.foodAmount = 1
    removeClass("food")
    document.getElementById("foodSmall").classList.add("control-active")
})

document.getElementById("foodMedium").addEventListener("click", () => {
    config.foodAmount = 5
    removeClass("food")
    document.getElementById("foodMedium").classList.add("control-active")
})

document.getElementById("foodLarge").addEventListener("click", () => {
    config.foodAmount = 10
    removeClass("food")
    document.getElementById("foodLarge").classList.add("control-active")
})

document.getElementById("speedSlow").addEventListener("click", () => {
    config.speed = 1
    removeClass("speed")
    document.getElementById("speedSlow").classList.add("control-active")
})

document.getElementById("speedMedium").addEventListener("click", () => {
    config.speed = 5
    removeClass("speed")
    document.getElementById("speedMedium").classList.add("control-active")
})

document.getElementById("speedFast").addEventListener("click", () => {
    config.speed = 10
    removeClass("speed")
    document.getElementById("speedFast").classList.add("control-active")
})

function removeClass(Class) {
    var items = document.getElementsByClassName(Class)
    for(let i = 0; i < items.length; i++){
        items[i].classList.remove("control-active")
    }
}

export { config };