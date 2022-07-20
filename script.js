// I think what is currently incorrect is the event listener being 
// in the gameBoard module as opposed to separating how this is done.
// I will be attempting to make the gameBoard, players, and an overarching
// GAME function that will call for the board, players, check for wins, etc.


let turnCount = 1; 
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
            // cell.addEventListener('click', () => { 
            //     if (cell.innerText != '') return;
            //     if (turnCount%2 === 1) cell.innerText = "X";
            //     if (turnCount%2 === 0) cell.innerText = "O";
            //     turnCount++;
            // });
            // cell.addEventListener('click', placeGameMarker(cell));
            boardContainer.appendChild(cell);
        }
    }
    return { createBoard };
})();

// const placeGameMarker = (cell) => { // I think this should be in an overall "Game" function
//     if (cell.innerText != '') return;
//     if (turnCount%2 === 1) cell.innerText = "X";
//     if (turnCount%2 === 0) cell.innerText = "O";
//     turnCount++;
// };

const player = () => {

}

const game = () => {
    gameBoard.createBoard();
    const newCells = document.querySelectorAll('.cell');

    boardContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
            if (e.target.innerText != '') return;
            if (turnCount%2 === 1) e.target.innerText = "X";
            if (turnCount%2 === 0) e.target.innerText = "O";
            checkForWin();
            turnCount++;
        }
    })

    const checkForWin = () => {
        // const newCells = document.querySelectorAll('.cell');
        if(winConditions.some((condition) => {
            return condition.every((currentVal) => {
                return newCells[currentVal].innerText === 'X';
            })
        })) console.log("X is the winner!")
        else if (winConditions.some((condition) => {
            return condition.every((currentVal) => {
                return newCells[currentVal].innerText === 'O';
            })
        })) console.log("O is the winner!")
    }

}
game();
