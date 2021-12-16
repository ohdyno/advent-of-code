const {calculatePosition} = require("./day2");
const parse = require("../inputs/parser");

describe('day 2', () => {
    describe('calculating submarine position', () => {
        it('works with a single command in an array', () => {
            const position = {
                horizontal: 0,
                depth: 0,
                aim: 0
            };
            const commands = ['down 5']
            const result = calculatePosition(position, commands);
            expect(result).toEqual({
                horizontal: 0,
                depth: 0,
                aim: 5
            })
        });

        it('works with multiple commands', () => {
            const position = {
                horizontal: 0,
                depth: 0,
                aim: 0
            };
            const commands = [
                'down 5',
                'forward 5',
            ]
            const result = calculatePosition(position, commands);
            expect(result).toEqual({
                horizontal: 5,
                depth: 25,
                aim: 5
            })
        });

        it('works with commands from a file', async () => {
            const position = {
                horizontal: 0,
                depth: 0,
                aim: 0,
            };

            const commands = await parse('day-2')
            const result = calculatePosition(position, commands);
            expect(result).toEqual({
                horizontal: 1970,
                aim: 916,
                depth: 1000556,
            })
            expect(result.horizontal * result.depth).toBe(1971095320)
        });
    })
})
