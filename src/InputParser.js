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
        const result = {};

        rl.on('line', (line) => {
            if (result.numbersDrawn) {

            } else {
                result.numbersDrawn = line.split(',');
            }
        })

        rl.on('close', () => {
            resolve(result);
        })
    })
}

module.exports = parse;
