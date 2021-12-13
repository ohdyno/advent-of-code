const path = require('path')
const fs = require('fs')
const readline = require('readline')

function parse(fileName) {
    const filePath = path.join(__dirname, 'inputs', `${fileName}.txt`)
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        terminal: false
    });

    return new Promise((resolve, reject) => {
        const result = {
            boards: [],
            numbersDrawn: undefined,
        };

        function handleLine(line) {
            if (line.length === 0) {
                return;
            }

            if (result.numbersDrawn) {
                const row = line.split(/\s+/).map(number => Number.parseInt(number));
                const newBoard = [row];
                if (result.boards.length === 0) {
                    result.boards.push(newBoard)
                } else {
                    if (result.boards[result.boards.length - 1].length === 5) {
                        result.boards.push(newBoard)
                    } else {
                        result.boards[result.boards.length - 1].push(row)
                    }
                }
            } else {
                result.numbersDrawn = line.split(',').map(number => Number.parseInt(number));
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
