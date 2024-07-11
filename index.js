// get values of all boxes
function getValues() {
    let values = [];
    for (let i = 1; i <= 9; i++) {
        values.push(document.getElementById("b" + i).value);
    }
    return values;
}

// get all buttons
function getButtons() {
    let buttons = [];
    for (let i = 1; i <= 9; i++) {
        buttons.push(document.getElementById("b" + i));
    }
    return buttons;
}

// check for a win
function checkWin(player) {
    const values = getValues();
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let combination of winningCombinations) {
        if (combination.every(index => values[index].toLowerCase() === player)) {
            return combination;
        }
    }
    return null;
}

// disable all buttons
function disableAllButtons() {
    const buttons = getButtons();
    buttons.forEach(button => button.disabled = true);
}

// highlight winning combination
function highlightWinningCombination(combination) {
    const buttons = getButtons();
    combination.forEach(index => buttons[index].style.background = "#70A37F");
}

// update the display message
function updateDisplayMessage(message) {
    document.getElementById('print').innerHTML = message;
    document.getElementById('print').classList.remove('hidden');
}

// update turn indicator
function updateTurnIndicator() {
    const turnO = document.getElementById('turnO');
    const turnX = document.getElementById('turnX');

    if (flag === 1) {
        turnO.style.background = "none";
        turnX.style.background = "#7ab47383";
    } else {
        turnO.style.background = "#7ab47383";
        turnX.style.background = "none";
    }
}

// handle game logic
function myfunc() {
    const values = getValues();

    const winningCombinationX = checkWin('x');
    const winningCombinationO = checkWin('0');

    if (winningCombinationX) {
        updateDisplayMessage("Player X won");
        disableAllButtons();
        highlightWinningCombination(winningCombinationX);
    } else if (winningCombinationO) {
        updateDisplayMessage("Player 0 won");
        disableAllButtons();
        highlightWinningCombination(winningCombinationO);
    } else if (values.every(value => value === 'X' || value === '0')) {
        updateDisplayMessage("Match Tie");
    } else {
        updateTurnIndicator();
    }
}

// reset the game
function reset() {
    location.reload();
}

// handle player moves
let flag = 1;
function handleMove(buttonId) {
    const button = document.getElementById(buttonId);
    button.value = flag === 1 ? "X" : "0";
    button.disabled = true;
    flag = 1 - flag;
    myfunc();
}

// add event listeners to buttons
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= 9; i++) {
        document.getElementById("b" + i).addEventListener('click', () => handleMove("b" + i));
    }
});
