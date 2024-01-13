// Variables and constants goes here 
let inputDirection = { x: 0, y: 0 };
const deadSound = new Audio('../assets/dead.wav');
const foodSound = new Audio('../assets/food.wav');
const overSound = new Audio('../assets/over.wav');
let lastPaintTime = 0;
let speed = 8;
let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 6, y: 8 };
let score = 0;

// Functions are here 
function main(ctime) {
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime
    gameEngine()
}

// if snake collide then this function will be called
function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snake.length; i++) { // Start from 1 to avoid comparing the head with itself
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // If snake bumps into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    // No collision
    return false;
}


function gameEngine() {
    // Part 1: Update the snake array
    // if the snake collide
    if (isCollide(snakeArr)) {
        overSound.play();
        inputDirection = { x: 0, y: 0 };
        alert('The game is Over. Please press any key to play again');
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    // if you have eaten the food, increment and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        deadSound.play();
        score += 1;
        scoreBox.innerHTML = 'Score: ' + score;  
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y });
        let a = 2;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    // Part 2: Display the snake and food
    // Displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y + 1; // Adding 1 to start from 1
        snakeElement.style.gridColumnStart = e.x + 1; // Adding 1 to start from 1
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y + 1; // Adding 1 to start from 1
    foodElement.style.gridColumnStart = food.x + 1; // Adding 1 to start from 1
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



// Main logic goes here(game loop: helps to paint your screen again and again)
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = { x: 0, y: 1 }; /*Start the game from here */
    foodSound.play();
    switch (e.key) {
        case 'ArrowUp':
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case 'ArrowDown':
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case 'ArrowLeft':
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case 'ArrowRight':
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        default:
            break;
    }
})