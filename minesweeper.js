const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(async function () {
    // X hidden mine
    // Z hidden no mine
    // n revealed - number of mines around (0-8)
    let rows = 20;
    let columns = 20;
    let numMines = 50;
    let board = Array(rows*columns).fill('Z');
    let gameOver = false;

    function fillBoard() {
        for (let i = 0; i < numMines; i++) {
            while (true) {
                let minePos = Math.floor(Math.random() * (rows * columns - 1));
                if (board[minePos] === 'Z') {
                    board[minePos] = 'X';
                    break;
                }
            }
        }
    }

    function printBoard() {
        for (let i = 0; i < board.length; i++) {
            process.stdout.write(board[i] + ' ');
            if ((i+1) % columns === 0) console.log('');
        }
    }

    function readLineFromUser(question) {
        return new Promise((resolve) => {
            rl.question(`${question}? ` , (answer) => resolve(answer));
        });
    }

    function getAdjacentMines(cellIndex) {
        let counter = 0;
        if (board[cellIndex-columns-1] === 'X') counter++;
        if (board[cellIndex-columns] === 'X') counter++;
        if (board[cellIndex-columns+1] === 'X') counter++;
        if (board[cellIndex-1] === 'X') counter++;
        if (board[cellIndex+1] === 'X') counter++;
        if (board[cellIndex+columns-1] === 'X') counter++;
        if (board[cellIndex+columns] === 'X') counter++;
        if (board[cellIndex+columns+1] === 'X') counter++;
        return counter;
    }

    fillBoard();
    
    while (!gameOver) {
        printBoard();
        let input = (await readLineFromUser('Next move (row,col)')).split(',');
        let selectedRow = parseInt(input[0]);
        let selectedCol = parseInt(input[1]);
        let cellIndex = selectedRow*rows + selectedCol;

        if (board[cellIndex] === 'X') gameOver = true;

        let adjacentMines = getAdjacentMines(cellIndex);

        board[cellIndex] = adjacentMines;
    }

    console.log("You're dead!");
    rl.close();
})();