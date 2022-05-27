const canvas = document.getElementById("gameBoard")
const ctx = canvas.getContext("2d")

const snakeSpeed = 5

let tileCount = 20
let tileSize = 18
let headX = 10
let headY = 10

let snakeDirection = "neutral"

let appleX = 105
let appleY = 105

let score = 0

class SnakePart{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}
let snakeParts = []
let tailLength = 2

function drawGame(){

    clearScreen()
    changeDirection()

    checkAppleCollision()
    drawApple()
    drawSnake()
    checkBorderCollision()

    setTimeout(drawGame, 1000/ snakeSpeed)
}

function clearScreen(){
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake(){
    ctx.fillStyle = "orange"
    ctx.fillRect(headX, headY, 18, 10)

    ctx.fillStyle = "green"
    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i]
        ctx.fillRect(part.x, part.y, 18, 10)
    }
    snakeParts.push(new SnakePart(headX, headY))
    if (snakeParts.length > tailLength){
        snakeParts.shift()
    }

}

function drawApple(){
    ctx.fillStyle = "red"
    ctx.fillRect(appleX, appleY, 18, 10)
}

function checkAppleCollision(){
    let randomX = []
    let randomY = []

    for (let x = 0; x <= 250; x++){
        if (x % 5 == 0){
            randomX.push(x)
        }      
    }

    for (let y = 0; y <= 130; y++){
        if (y % 10 == 0){
            randomY.push(y)
        }
    }

    if (headX == appleX - 5 || headX == appleX || headX == appleX + 5){
        if(headY == appleY){
            appleX = randomX[Math.floor(Math.random() * randomX.length)]
            appleY = randomY[Math.floor(Math.random() * randomY.length)]
            tailLength += 1
            drawApple()

            score += 1
            document.querySelector("#gameScore").innerText = score
            
        }   
    }


}

function checkBorderCollision(){
    if (headX < 0 || headY < 0 || headX > 280 || headY > 140 ){
        alert("Game Over!")
        headX = 10
        headY = 10
        snakeDirection = "neutral"
        snakeParts = []
        tailLength = 2

        score = 0
        document.querySelector("#gameScore").innerText = score
    }
    
}

function changeDirection(){
    if (snakeDirection == "down"){
        headY += snakeSpeed
    }
    if (snakeDirection == "up"){
        headY -= snakeSpeed
    }
    if (snakeDirection == "right"){
        headX += 10
    }
    if (snakeDirection == "left"){
        headX -= 10
    }
}

document.body.addEventListener("keydown", keyEvent)

function keyEvent(event){
    if (event.keyCode == 38){
        snakeDirection = "up"
    }
    if (event.keyCode == 40){
        snakeDirection = "down"
    }
    if (event.keyCode == 37){
        snakeDirection = "left"
    }
    if (event.keyCode == 39){
        snakeDirection = "right"
    }
}

document.querySelector("#resetBtn").addEventListener("click", function(event){
    headX = 10
    headY = 10
    snakeDirection = "neutral"
    snakeParts = []
    tailLength = 2

    score = 0
    document.querySelector("#gameScore").innerText = score
})



drawGame()