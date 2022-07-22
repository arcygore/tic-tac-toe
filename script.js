// I think what is currently incorrect is the event listener being 
// in the gameBoard module as opposed to separating how this is done.
// I will be attempting to make the gameBoard, players, and an overarching
// GAME function that will call for the board, players, check for wins, etc.


let turnCount = 1; 
let xMarker = 'X';
let oMarker = 'O';
let currentMarker = xMarker;
const winConditions = 
                    [[0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]];

const boardContainer = document.querySelector('.game-board');
const boardCell = document.querySelectorAll('.cell');
const winnerModal = document.querySelector('.winner-modal');
const winnerText = document.querySelector('.winner-text');
const rematchButton = document.querySelector('.rematch');
const quitButton = document.querySelector('.quit');
const overlay = document.querySelector('.overlay');
const playerXName = document.querySelector('.playerXname');
const playerOName = document.querySelector('.playerOname');
const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');
const turn = document.querySelector('.turn');


// Module Function 

const gameBoard = (() => {

    const createBoard = () => {
        for (let i = 1; i <= 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add(`cell${i}`);
            cell.classList.add('cell');
            cell.style.display = "flex";
            cell.style.alignItems = 'center';
            cell.style.justifyContent = 'center';
            cell.style.fontSize = '8rem';
            boardContainer.appendChild(cell);
        }
    }

    return { createBoard };
})();

// Player Function - I don't know how to implement this with the way I've programmed
// everything else in the game() function. I'm wanting to run through every cell and 
// ensure they're cleared of data, but I create the game board in the game function.

// const players = () => {
//     let playerX = '';
//     let playerO = '';

//     startButton.addEventListener('click', () => {
//         playerX = playerXName.value;
//         playerO = playerOName.value;
//         game();
//     })

//     return { playerX , playerO }
// }


const game = () => {
    gameBoard.createBoard();
    const newCells = document.querySelectorAll('.cell');

    const resetBoard = () => {
        newCells.forEach((cell) => {
            cell.innerText = '';
            winnerText.innerText = '';
            turnCount = 1;
        }) 
        currentMarker = xMarker;
        winnerModal.classList.remove('active');
        overlay.classList.remove('active');
    }

    startButton.addEventListener('click', () => {
        playerX = playerXName.value;
        playerO = playerOName.value;
        currentMarker = xMarker;
        turn.innerText = `${playerX}'s turn!`;
        resetBoard();
    })

    boardContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
            if (e.target.innerText != '') return;
            e.target.innerText = currentMarker;
            checkForWin();
            if (currentMarker === xMarker) {   
                turn.innerText = `${playerO}'s turn!`;         
                return currentMarker = oMarker;
            }
            else if (currentMarker === oMarker) {   
                turn.innerText = `${playerX}'s turn!`;         
                return currentMarker = xMarker;
            }
        }
    })

    rematchButton.addEventListener('click', resetBoard);
    
    quitButton.addEventListener('click', () => {
        resetBoard();
        turn.innerText = '';
        playerOName.value = '';
        playerXName.value = '';
    })

    const checkForWin = () => {
        if(winConditions.some((condition) => {
            return condition.every((currentVal) => {
                return newCells[currentVal].innerText === currentMarker;
            })
        })) {
            if (currentMarker == xMarker) winnerText.innerText = `${playerX.toUpperCase()} WINS!`;
            if (currentMarker == oMarker) winnerText.innerText = `${playerO.toUpperCase()} WINS!`;
            winnerModal.classList.add('active');
            overlay.classList.add('active');
        }
    }

    // const resetBoard = () => {
    //     newCells.forEach((cell) => {
    //         cell.innerText = '';
    //         winnerText.innerText = '';
    //         turnCount = 1;
    //         winnerModal.classList.remove('active');
    //         overlay.classList.remove('active');
    //     }) 
    //     currentMarker = xMarker;
    // }

}

game();
