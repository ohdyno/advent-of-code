const path = require('path')
const fs = require('fs')
const readline = require('readline')

function day1Parser(rl) {
    return (resolve) => {
        let result = [];

        function handleLine(line, result) {
            if (line.length === 0) {
                return result
            }

            return [...result, Number.parseInt(line)]
        }

        rl.on('line', (line) => {
            result = handleLine(line, result);
        })

        rl.on('close', () => {
            resolve(result);
        })
    }
}

function parseLinesIntoArray(rl) {
    return (resolve) => {
        let result = [];

        function handleLine(line, result) {
            if (line.length === 0) {
                return result
            }

            return [...result, line]
        }

        rl.on('line', (line) => {
            result = handleLine(line, result);
        })

        rl.on('close', () => {
            resolve(result);
        })
    }
}

function day4Parser(rl) {
    return (resolve) => {

        let result = {
            boards: [],
            numbersDrawn: undefined,
        };

        function handleLine(line, result) {
            if (line.length === 0) {
                return result;
            }

            function handleBoardRow(line, result) {
                function isTheBeginningOfANewBoard(boards) {
                    function lastBoardIsComplete() {
                        return boards.at(-1).length === 5;
                    }

                    function hasNoBoards() {
                        return boards.length === 0;
                    }

                    return hasNoBoards() || lastBoardIsComplete();
                }

                const row = line.split(/\s+/).map(number => Number.parseInt(number));
                const boards = result.boards;

                if (isTheBeginningOfANewBoard(boards)) {
                    return {
                        ...result,
                        boards: [...boards, [row]]
                    }
                }

                return {
                    ...result,
                    boards: [...(boards.slice(0, -1)), [...(boards.at(-1)), row]]
                }
            }

            function handleNumbersDrawn(line, result) {
                return {
                    ...result,
                    numbersDrawn: line.split(',').map(number => Number.parseInt(number))
                }
            }

            if (result.numbersDrawn) {
                return handleBoardRow(line, result);
            }
            return handleNumbersDrawn(line, result);
        }

        rl.on('line', (line) => {
            result = handleLine(line, result);
        })

        rl.on('close', () => {
            resolve(result);
        })
    }
}

function getSpecificDayInputParser(fileName) {
    const filePath = path.join(__dirname, 'inputs', `${fileName}.txt`)
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        terminal: false
    });

    switch (fileName) {
        case 'day-1':
            return day1Parser(rl)
        case 'day-2':
        case 'day-3':
            return parseLinesIntoArray(rl);
        case 'day-4':
            return day4Parser(rl)
        default:
            return (_, reject) => reject(`does not know how to handle ${fileName}`)
    }

}

function parse(fileName) {
    const parseSpecificDayInput = getSpecificDayInputParser(fileName);
    return new Promise(parseSpecificDayInput)
}

module.exports = parse;
