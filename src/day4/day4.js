function calculateBingoBoardScore({numbersDrawn, boards}, wantQuickestWinningBoard) {
    function play(numbersDrawn, boards) {
        function processBoards(boards) {
            return boards.map(board => {
                /**
                 * Map the location (row, column) for each number on the board
                 */
                function mapEntries(board) {
                    return board.reduce((numberLocations, row, rowIndex) => {
                        const locationsForNumbersInRow = row.map((number, columnIndex) => ({
                            number,
                            location: {
                                row: rowIndex,
                                column: columnIndex
                            }
                        }));

                        return locationsForNumbersInRow.reduce((locations, {number, location}) => {
                            const previousLocations = locations[number] || [];
                            return {
                                ...locations,
                                [number]: [...previousLocations, location]
                            }
                        }, numberLocations)
                    }, {})
                }

                /**
                 * Calculate the sum of all numbers on the board.
                 */
                function sum(board) {
                    return board.flat().reduce((a, b) => a + b);
                }

                return {
                    locations: mapEntries(board),
                    score: {
                        rows: [0, 0, 0, 0, 0],
                        columns: [0, 0, 0, 0, 0],
                    },
                    sum: sum(board),
                    bingo: false,
                    numbers: []
                }
            });
        }

        function processNumbersDrawn(numbersDrawn, processedBoards) {
            return processedBoards.map(board => {
                return numbersDrawn.reduce((board, number) => {
                    if (board.bingo) {
                        return board
                    }

                    function updateBoard(board, number) {
                        const score = board.locations[number].reduce((score, coordinate) => ({
                            rows: score.rows.map((count, row) => row === coordinate.row ? count + 1 : count),
                            columns: score.columns.map((count, column) => column === coordinate.column ? count + 1 : count)
                        }), board.score);

                        return {
                            ...board,
                            numbers: [...board.numbers, number],
                            sum: board.sum - number,
                            score,
                            bingo: score.rows.some(count => count === 5) || score.columns.some(count => count === 5)
                        };
                    }

                    if (board.locations[number]) {
                        return updateBoard(board, number);
                    }

                    return {
                        ...board,
                        numbers: [...board.numbers, number]
                    };
                }, board);
            });
        }

        const processedBoards = processBoards(boards);
        return processNumbersDrawn(numbersDrawn, processedBoards);
    }

    function sortByQuickestToWin(result) {
        return result.filter(({bingo}) => bingo).sort((a, b) => a.numbers.length - b.numbers.length);
    }

    const result = play(numbersDrawn, boards);
    const winningBoard = sortByQuickestToWin(result).at(wantQuickestWinningBoard ? 0 : -1)
    return winningBoard.sum * winningBoard.numbers.at(-1);
}

module.exports = {
    calculateBingoBoardScore
}
