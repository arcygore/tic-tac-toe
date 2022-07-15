let turnCount = 1;

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
            cell.addEventListener('click', () => {
                if (cell.innerText != '') return;
                if (turnCount%2 === 1) cell.innerText = "X";
                if (turnCount%2 === 0) cell.innerText = "O";
                turnCount++;
            });
            boardContainer.appendChild(cell);
        }
    }
    return { createBoard };
})();

gameBoard.createBoard();
