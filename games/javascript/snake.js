var blockSize = 30;
var rows = 20;
var cols = 20;
var board;
var context;
var resetButton;
var scoreboard;

// Snake variables
var snake = [];
var snakeLength = 1;
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var snakeSpeedX = 1;
var snakeSpeedY = 0;

// Food variables
var foodX;
var foodY;

// Score variable
var score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    // Initialize the snake
    snake.push({ x: snakeX, y: snakeY });

    // Generate the initial food location
    generateFood();

    // Initialize the scoreboard element
    scoreboard = document.getElementById("scoreboard");
    updateScoreboard();

    // Start the game loop
    setInterval(update, 100); // Adjust the interval for desired game speed

    // Add event listeners for arrow key and WASD input
    document.addEventListener("keydown", changeDirection);
    resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetGame);
}

function update() {
    // Clear the canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Update the snake's position
    snakeX += snakeSpeedX * blockSize;
    snakeY += snakeSpeedY * blockSize;

    // Check for collisions with the canvas boundaries and implement teleportation
    if (snakeX < 0) {
        snakeX = board.width - blockSize;
    } else if (snakeX >= board.width) {
        snakeX = 0;
    }
    
    if (snakeY < 0) {
        snakeY = board.height - blockSize;
    } else if (snakeY >= board.height) {
        snakeY = 0;
    }

    // Check for collisions with the snake's own body
    if (checkSelfCollision()) {
        gameOver();
        return;
    }

    // Check for collision with food
    if (snakeX === foodX && snakeY === foodY) {
        // Increase the snake's length
        snakeLength++;
        // Increase the score
        score += 10;
        updateScoreboard();
        // Generate new food
        generateFood();
    }

    // Remove tail segment if the snake has grown too long
    if (snake.length > snakeLength) {
        snake.shift();
    }

    // Add the new head of the snake
    snake.push({ x: snakeX, y: snakeY });

    // Draw the snake
    snake.forEach((segment, index) => {
        // Check if the segment is the head
        const isHead = index === snake.length - 1;
        drawSnakeSegment(segment, isHead);
    });

    // Draw the food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
}

function drawSnakeSegment(segment, isHead) {
    // Use a darker green for the head, and lighter green for the body
    if (isHead) {
        context.fillStyle = "darkgreen";
    } else {
        context.fillStyle = "lime";
    }

    // Draw the snake's border (white)
    context.strokeStyle = "white";
    context.lineWidth = 2; // Adjust the border width as needed
    context.strokeRect(segment.x, segment.y, blockSize, blockSize);

    // Draw the snake's segment
    context.fillRect(segment.x, segment.y, blockSize, blockSize);
}

function changeDirection(event) {
    // Handle arrow key and WASD input to change the snake's direction
    switch (event.key) {
        case "ArrowUp":
        case "w":
            if (snakeSpeedY !== 1) { // Prevent moving into the opposite direction
                snakeSpeedX = 0;
                snakeSpeedY = -1;
            }
            break;
        case "ArrowDown":
        case "s":
            if (snakeSpeedY !== -1) {
                snakeSpeedX = 0;
                snakeSpeedY = 1;
            }
            break;
        case "ArrowLeft":
        case "a":
            if (snakeSpeedX !== 1) {
                snakeSpeedX = -1;
                snakeSpeedY = 0;
            }
            break;
        case "ArrowRight":
        case "d":
            if (snakeSpeedX !== -1) {
                snakeSpeedX = 1;
                snakeSpeedY = 0;
            }
            break;
        case "r":
            resetGame(); // Reset the game when the "R" key is pressed
            break;
    }
}

function generateFood() {
    // Generate random coordinates for the food within the canvas boundaries
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function updateScoreboard() {
    // Update the scoreboard with the current score
    scoreboard.textContent = "Score: " + score;
}

function checkSelfCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snakeX === snake[i].x && snakeY === snake[i].y) {
            return true; // Snake collided with itself
        }
    }
    return false;
}

function gameOver() {
    alert("Game Over! Your score: " + score);
    resetGame();
}

function resetGame() {
    // Reset the game by clearing the canvas, reinitializing variables, and starting a new game
    snake = [];
    snakeLength = 1;
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    snakeSpeedX = 1;
    snakeSpeedY = 0;
    snake.push({ x: snakeX, y: snakeY });
    score = 0;
    updateScoreboard();
    generateFood();
}