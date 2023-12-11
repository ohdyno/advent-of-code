let calculateBingoBoardScore;

function sumBoards(boards) {
    function sumBoard(board) {
        return board.flat().reduce((a, b) => a + b);
    }

    return boards.map(sumBoard);
}

function locateAllNumbers(boards) {
    function locateAllNumbersOnBoard(board) {
        return board.reduce((locations, row, rowIndex) => {
            return row.reduce((locations, number, columnIndex) => {
                return {
                    ...locations,
                    [number]: [rowIndex, columnIndex]
                }
            }, locations)
        }, {})
    }

    return boards.map(locateAllNumbersOnBoard)
}

module.exports = {
    calculateBingoBoardScore,
    sumBoards,
    locateAllNumbers
}
