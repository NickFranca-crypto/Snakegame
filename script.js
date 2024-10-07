const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 100, y: 100 };
let score = 0;

function drawSnake() {
    ctx.fillStyle = "lime"; // Corrigido
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, 20, 20); // Corrigido
    });
}

function drawFood() {
    ctx.fillStyle = "red"; // Corrigido
    ctx.fillRect(food.x, food.y, 20, 20); // Corrigido
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }; // Corrigido
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        placeFood();
    } else {
        snake.pop();
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
}

function gameOver() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height;
}

function update() {
    if (gameOver()) {
        alert("Fim de jogo! Pontuação: " + score);
        snake = [{ x: 200, y: 200 }];
        direction = { x: 0, y: 0 };
        score = 0;
        placeFood(); // Para colocar a comida após o reinício
    }

    moveSnake();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

window.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowUp": // Corrigido
            if (direction.y === 0) direction = { x: 0, y: -20 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 20 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -20, y: 0 }; // Corrigido
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 20, y: 0 }; // Corrigido
            break;
    }
});

setInterval(update, 100);
