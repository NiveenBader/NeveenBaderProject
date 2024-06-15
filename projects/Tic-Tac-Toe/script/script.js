const divs = document.querySelectorAll("#board>div");
let isX = true;
let isGameOver = false;

// לולאה העוברת על כל המשבצות
for (const div of divs) {
    // הוספת פונקציה המופעלת בעת לחיצה על אחת המשבצות
    div.addEventListener("click", function (ev) {
        if (isGameOver) {
            return;
        }
        // האלמנט שעליו לחץ השחקן
        const elem = ev.target;

        // אם המשבצת מלאה, הפונקציה נעצרת
        if (elem.innerText) {
            return;
        }

        if (isX) {
            elem.innerText = "X";
        } else {
            elem.innerText = "O";
        }

        // שינוי תור
        isX = !isX;
        // הפעלת הפונקציה של המחווה הויזואלית
        showTurn();
        checkWinner();

    });
}

/**
 * פונקציה הנותנת מחווה של איזה שחקן התור הנוכחי
 */
function showTurn() {
    // קודם כל, הסרנו את הקלאס מהשחקן האחרון
    document.querySelector('.currentTurn').classList.remove('currentTurn');

    // שם את הקלאס בהתאם לתור השחקן
    if (isX) {
        document.querySelector("#players>div:first-child").classList.add('currentTurn');
    } else {
        document.querySelector("#players>div:last-child").classList.add('currentTurn');
    }
}

let counterX = 0;
let counterY = 0;
function checkWinner() {
    const options = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];


    for (const op of options) {

        if (op.every(myIndex => divs[myIndex].innerText === 'X')) {
            winner(op, 'X');
            counterX += 1;
            isX = true;
            document.querySelector('.playerX').innerHTML = `${counterX} Score:`;

            break;
        } else if (op.every(myIndex => divs[myIndex].innerText === 'O')) {
            winner(op, 'O');
            counterY += 1;
            isX = false;
            document.querySelector('.playerY').innerHTML = `${counterY} Score:`;

            break;
        }



    }
}

function winner(op, win) {
    setTimeout(() => alert(win + " is winner!"), 50);

    op.forEach(x => divs[x].classList.add('win'));

    isGameOver = true;
}


function newGame() {
    divs.forEach(divs => {
        divs.innerText = "";
        divs.classList.remove('win');
    })


    isGameOver = false;
    showTurn();
}


function StartOver() {
    counterX = 0;
    counterY = 0;

    document.querySelector('.playerX').innerHTML = `${counterX} Score:`;
    document.querySelector('.playerY').innerHTML = `${counterY} Score:`;
    divs.forEach(div => {
        div.innerText = "";
        div.classList.remove('win');
    });

}

