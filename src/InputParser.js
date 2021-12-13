const path = require('path')
const fs = require('fs')
const readline = require('readline')

function createLineParser(readline, initialResult, handleLine) {
    return new Promise((resolve) => {
        let result = initialResult

        readline.on('line', (line) => {
            result = handleLine(line, result);
        })

        readline.on('close', () => {
            resolve(result);
        })
    });
}

function day1Parser(readline) {
    let initialResult = [];

    function handleLine(line, result) {
        if (line.length === 0) {
            return result
        }

        return [...result, Number.parseInt(line)]
    }

    return createLineParser(readline, initialResult, handleLine)
}

function parseLinesIntoArray(readline) {
    let initialResult = [];

    function handleLine(line, result) {
        if (line.length === 0) {
            return result
        }

        return [...result, line]
    }

    return createLineParser(readline, initialResult, handleLine)
}

function day4Parser(readline) {
    let initialResult = {
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

    return createLineParser(readline, initialResult, handleLine)
}

function rejectFile(fileName) {
    return Promise.reject(`does not know how to handle ${fileName}`);
}

function createReadlineForFile(fileName) {
    const filePath = path.join(__dirname, 'inputs', `${fileName}.txt`)
    return readline.createInterface({
        input: fs.createReadStream(filePath),
        terminal: false
    });
}

function parse(fileName) {
    const readline = createReadlineForFile(fileName);

    switch (fileName) {
        case 'day-1':
            return day1Parser(readline)
        case 'day-2':
        case 'day-3':
            return parseLinesIntoArray(readline);
        case 'day-4':
            return day4Parser(readline)
        default:
            return rejectFile(fileName)
    }
}

module.exports = parse;
