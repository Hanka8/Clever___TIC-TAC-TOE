const INFO_MSG = document.getElementById("infoMessage");
const START_BTN = document.getElementById("startBtn");
const CELLS = document.querySelectorAll('.cell');

const handleClick = (e) => {
    if (board[e.target.id] == '') {
        INFO_MSG.textContent = "";
        makeMove(e.target.id)
        if (currentPlayer == 'X') {
            e.target.classList.add("cross")
        } else {
            e.target.classList.add("circle")
        }
        makeComputerMove();
    } else {
        INFO_MSG.textContent = "Space occupied!"
    };
}

// Create a game board array
let board = [
    '', '', '',
    '', '', '',
    '', '', ''
];

// Create a variable to keep track of whose turn it is
let currentPlayer = 'X';

let computerPlayer = (currentPlayer === 'X') ? 'O' : 'X';

// Function to check if a player has won
function checkWin(player, boardCount = board) {
    // Check for horizontal wins
    if ((boardCount[0] === player && boardCount[1] === player && boardCount[2] === player) ||
        (boardCount[3] === player && boardCount[4] === player && boardCount[5] === player) ||
        (boardCount[6] === player && boardCount[7] === player && boardCount[8] === player)) {
        return true;
    }
    // Check for vertical wins
    if ((boardCount[0] === player && boardCount[3] === player && boardCount[6] === player) ||
        (boardCount[1] === player && boardCount[4] === player && boardCount[7] === player) ||
        (boardCount[2] === player && boardCount[5] === player && boardCount[8] === player)) {
        return true;
    }
    // Check for diagonal wins
    if ((board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)) {
        return true;
    }
    // If no win condition is met, return false
    return false;
}

// Function to check if the game is a tie
function checkTie() {
    // If there are no more empty spaces on the board, it's a tie
    return !board.includes('');
}

// Function to make a move
function makeMove(index) {
    // If the space is already occupied, return false
    if (board[index] !== '') {
        return false;
    }
    // Otherwise, update the board and switch players
    board[index] = currentPlayer;
    //check win
    if (checkWin(currentPlayer)) {
        INFO_MSG.textContent = "Player has won!";
        CELLS.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        });
    }
    //check tie
    if (checkTie()) {
        INFO_MSG.textContent = "It's a tie!";
    }
    return true;
}

function makeComputerMove() {
    if (checkWin(currentPlayer)) {
        INFO_MSG.textContent = "Player has won!";
        CELLS.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        });
    }
  
    let index = calculateBestMove(board);
    // Make the move and return the index
    board[index] = computerPlayer;
    if (currentPlayer == 'X') {
        document.getElementById(index).classList.add("circle")
    } else {
        document.getElementById(index).classList.add("cross")
    }
    //check win
    if (checkWin(computerPlayer)) {
        INFO_MSG.textContent = "Computer has won!";
        CELLS.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        });
    }
    //check tie
    if (checkTie()) {
        INFO_MSG.textContent = "It's a tie!";
    }
}

// Function to reset the game
function resetGame() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    CELLS.forEach(cell => {
        cell.classList.remove("cross", "circle");
    });
    currentPlayer = 'X';
}

START_BTN.addEventListener('click', () => {
    CELLS.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
    resetGame();
});


CELLS.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

//FUNCTIONALITY
function calculateBestMove(board) {
    // Make a copy of the board array to work with
    let boardCopy = [...board];
    
    // Array to store all possible moves
    let availableMoves = [];

    // Loop through all cells on the board
    for (let i = 0; i < 9; i++) {
        // If the cell is empty, add its index to the availableMoves array
        if (boardCopy[i] === '') {
            availableMoves.push(i);
        }
    }
    console.log(boardCopy);
    console.log(availableMoves);

    // Check if there's a winning move for the computer player
    for (let i = 0; i < availableMoves.length; i++) {
        let index = availableMoves[i];
        boardCopy[index] = computerPlayer;
        if (checkWin(computerPlayer, boardCopy)) {
            return index;
        }
        boardCopy[index] = '';
    }

    // Check if there's a winning move for the human player and block it
    for (let i = 0; i < availableMoves.length; i++) {
        let index = availableMoves[i];
        boardCopy[index] = currentPlayer;
        if (checkWin(currentPlayer, boardCopy)) {
            return index;
        }
        boardCopy[index] = '';
    }

    // If there's no winning move for either player, return a random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}