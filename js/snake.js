const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake, direction, apple, score, gameOver;

function initializeGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    apple = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    score = 0;
    gameOver = false;
}

initializeGame();

// Handle user input
document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "ArrowUp":
            e.preventDefault(); // Prevent the default scrolling behavior
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            e.preventDefault(); // Prevent the default scrolling behavior
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            e.preventDefault(); // Prevent the default scrolling behavior
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            e.preventDefault(); // Prevent the default scrolling behavior
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});


// Event listeners for on-screen D-Pad controls
document.getElementById("up").addEventListener("click", () => {
    if (direction.y === 0) direction = { x: 0, y: -1 };
});
document.getElementById("down").addEventListener("click", () => {
    if (direction.y === 0) direction = { x: 0, y: 1 };
});
document.getElementById("left").addEventListener("click", () => {
    if (direction.x === 0) direction = { x: -1, y: 0 };
});
document.getElementById("right").addEventListener("click", () => {
    if (direction.x === 0) direction = { x: 1, y: 0 };
});

// Update game state
function update() {
    if (gameOver) return;

    // Move snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check if snake eats the apple
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        apple = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    } else {
        snake.pop();
    }

    // Check collision with walls or self
    if (
        head.x < 0 || head.y < 0 || head.x >= tileCount || head.y >= tileCount ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver = true;
    }
}

// Draw the game elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment) => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw apple
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);

    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
    }
}

// Game loop
function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        setTimeout(gameLoop, 100); // Update game every 100ms
    }
}

// Restart game when button is clicked
document.getElementById("restartButton").addEventListener("click", () => {
    initializeGame();
    gameLoop(); // Restart the game loop
});

// Start the game
gameLoop();
