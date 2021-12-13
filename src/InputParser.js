const path = require('path')
const fs = require('fs')
const readline = require('readline')

function parse(fileName) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, 'inputs', `${fileName}.txt`)
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            terminal: false
        });

        const result = {
            boards: [],
            numbersDrawn: undefined,
        };

        function handleLine(line) {
            if (line.length === 0) {
                return;
            }

            function handleBoardRow(line) {
                function isTheBeginningOfANewBoard(boards) {
                    function lastBoardIsComplete() {
                        return boards[boards.length - 1].length === 5;
                    }

                    function hasNoBoards() {
                        return boards.length === 0;
                    }

                    return hasNoBoards() || lastBoardIsComplete();
                }

                const row = line.split(/\s+/).map(number => Number.parseInt(number));

                if (isTheBeginningOfANewBoard(result.boards)) {
                    result.boards.push([row])
                } else {
                    const lastBoard = result.boards[result.boards.length - 1];
                    lastBoard.push(row)
                }
            }

            function handleNumbersDrawn(line) {
                result.numbersDrawn = line.split(',').map(number => Number.parseInt(number));
            }

            if (result.numbersDrawn) {
                handleBoardRow(line);
            } else {
                handleNumbersDrawn(line);
            }
        }

        rl.on('line', (line) => {
            handleLine(line);
        })

        rl.on('close', () => {
            resolve(result);
        })
    })
}

module.exports = parse;
