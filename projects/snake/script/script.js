const board = document.querySelector("#board");
const width = window.screen.width < 640 ? 20 : 40;
const height = window.screen.height < 800 ? 20 : 40;
const cols = 3;
const snake = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const divs = [];
let direction = 'left';
let random
let isGameOver = false;
let point = 0;
const spanPoint = document.querySelector("#point");

function createBoard() {
    board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

    for (let i = 0; i < width * height; i++) {
        const div = document.createElement("div");
        board.appendChild(div);
        divs.push(div);
    }

    color();
    apple();
    if (Number(localStorage.x)) {
        point = Number(localStorage.x)
    }
    else {
        point = 0;
    }
    spanPoint.innerText = point;

}

function color() {
    divs.forEach(div => {
        div.classList.remove("snake");
        div.classList.remove("colorHead");
    })


    snake.forEach(x => {
        divs[x].classList.add("snake");
    });
    divs[snake[0]].classList.add("colorHead");
}

function move(dir) {

    localStorage.x = point;
    let head = snake[0];
    if (isGameOver) {
        return;
    }
    if (dir === 'up') {
        if (direction === 'down') {
            return;
        }

        head -= width;

        // בדיקת גבולות - אם הנחש עומד לחרוג מה-0
        if (head < 0) {

            gameOver();
            return;
        }
    } else if (dir === 'down') {
        if (direction === 'up') {
            return;
        }

        head += width;

        if (head >= width * height) {

            gameOver()
            return;
        }
    } else if (dir === 'left') {
        if (direction === 'right') {
            return;
        }

        head++;

        if (head % width === 0) {

            gameOver();
            return;
        }
    } else if (dir === 'right') {
        if (direction === 'left') {
            return;
        }

        if (head % width === 0) {

            gameOver();
            return;
        }

        head--;
    }
    if (snake.includes(head)) {
        gameOver();
        return;

    }
    direction = dir;
    snake.unshift(head);
    if (divs[random] === divs[snake[0]]) {
        apple();
        sound("../snake/audio/Pebble.ogg");
        point++;
        spanPoint.innerText = point;
        color();
    } else {
        snake.pop();
        color();
    }
}

window.addEventListener("keydown", ev => {
    ev.preventDefault();

    switch (ev.key) {
        case "ArrowUp": clear(), move("up"), inter(); break;
        case "ArrowRight": clear(), move("right"), inter(); break;
        case "ArrowDown": clear(), move("down"), inter(); break;
        case "ArrowLeft": clear(), move("left"), inter(); break;
        case "Escape": clear(); break;
    }
});
window.addEventListener("touchend", eve => {

    switch (eve.target.classList.value) {
        case "up": clear(), move("up"), inter(); break;
        case "right": clear(), move("right"), inter(); break;
        case "down": clear(), move("down"), inter(); break;
        case "left": clear(), move("left"), inter(); break;
        case "pause": clear(); break;

    }
});



function sound(fileName) {
    const audio = document.createElement('audio');
    audio.src = fileName;
    audio.play();
}

function inter() {
    const interval = setInterval(() => {
        move(direction);
    }, 200 - (point * 5));

}
function sound(fileName) {
    const audio = document.createElement('audio');
    audio.src = fileName;
    audio.play();
}

function gameOver() {
    clear()
    alert("Game over");
    isGameOver = true;
    direction = 'left';
    sound("../snake/audio/Country_Blues.ogg");
    point = localStorage.x;

}

function clear() {
    // Get a reference to the last interval + 1
    const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
    }
}

function apple() {
    random = Math.floor(Math.random() * (width * height));
    divs.forEach(div => {
        div.classList.remove("apple");
    })
    if (snake.includes(random)) {
        apple();
    }
    else {
        divs[random].classList.add("apple");
    }
}
function newGame() {
    snake.splice(0, snake.length);
    snake.push(9, 8, 7, 6, 5, 4, 3, 2, 1, 0);
    isGameOver = false;
    clear()
    color();
    apple()
}

function pauseGame() {
    clear()
}
function resetScore() {
    localStorage.clear();
    point = 0;
    spanPoint.innerText = point;
}