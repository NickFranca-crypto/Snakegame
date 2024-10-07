const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ X: 200, y: 200}]
let direction = [{ X: 0, y: 0}]
let food = [{ X: 100, y: 100}]
let score = 0;

function drawSnake(){
    ctx.fillstyle = "lime";
    snake.forEach(part =>{
        ctx.fillrect(part.X, part.y, 20, 20 );
    });
}

function drawFood(){
    ctx.fillstyle = "red";
    ctx.fillrect(food.X, food.Y, 20, 20);
}

function moveSnake (){
    const head = {snake[0].X + direction.X, y: snake[0].y + direction.y};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y){
        score += 10;
        placeFood();
    }else{
        snake.pop();
    }
}

function placeFood () {
    food.x = Math.floor(Math.random()* 20) * 20;
    food.y = Math.floor(Math.random()* 20) * 20;
}

function gameOver() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return snake[0].x < 0 || snake[0].x >= canvas.width || snake [0].y < 0 || snake [0].y >= canvas.height;
}

function update() {
    if(gameOver()) {
        alert("Fim de jogo! Pontuação: " + score);
        snake = [{x: 200, y: 200 }];
        direction = {x: 0, y: 0 };
        score = 0;
    }

    moveSnake();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

window.addEventListener("keydown", function(e){
    switch (e.key) {
        case " ArrowUp":
            if(direction.y === 0) direction = {x: 0, y: -20};
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = {x: 0, y: 20 };
            break;
        case "ArrowLeft":
            if (direction.y === 0) direction = {x: -20, y: 0 };
            break;
        case "ArrowRight":
            if (direction.y === 0) direction = {x: 20, y: 0 };
            break;
    }
});

setInterval(update, 100);
