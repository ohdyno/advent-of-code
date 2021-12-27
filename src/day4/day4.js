let calculateBingoBoardScore;

function sumBoards(boards) {
    function sumBoard(board) {
        return board.flat().reduce((a, b) => a + b);
    }

    return boards.map(sumBoard);
}

module.exports = {
    calculateBingoBoardScore,
    sumBoards
}
