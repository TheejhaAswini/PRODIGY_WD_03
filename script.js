// script.js
const boxes = document.querySelectorAll('.box');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = () => {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};

const checkDraw = () => {
    return board.every(box => box);
};

const computerMove = () => {
    let availableBoxes = [];
    board.forEach((box, index) => {
        if (!box) availableBoxes.push(index);
    });
    const randomIndex = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    board[randomIndex] = 'O';
    boxes[randomIndex].innerText = 'O';
    if (checkWin()) {
        message.innerText = 'Computer wins!';
        isGameActive = false;
        return;
    }
    if (checkDraw()) {
        message.innerText = 'Draw!';
        isGameActive = false;
        return;
    }
    currentPlayer = 'X';
};

const handleBoxClick = (e) => {
    const box = e.target;
    const index = box.getAttribute('data-index');

    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    box.innerText = currentPlayer;

    if (checkWin()) {
        message.innerText = `${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (checkDraw()) {
        message.innerText = 'Draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = 'O';
    setTimeout(computerMove, 500);
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    boxes.forEach(box => box.innerText = '');
    message.innerText = '';
};

boxes.forEach(box => box.addEventListener('click', handleBoxClick));
resetButton.addEventListener('click', resetGame);

