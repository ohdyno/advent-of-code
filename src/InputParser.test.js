const parse = require('./InputParser')

describe('Input file parser', () => {
    describe('day 4 inputs', () => {
        it('extracts the numbers drawn', async () => {
            const {numbersDrawn} = await parse('day-4');
            expect(numbersDrawn).toStrictEqual([13, 79, 74, 35, 76, 12, 43, 71, 87, 72, 23, 91, 31, 67, 58, 61, 96, 16, 81, 92, 41, 6, 32, 86, 77, 42, 0, 55, 68, 14, 53, 26, 25, 11, 45, 94, 75, 1, 93, 83, 52, 7, 4, 22, 34, 64, 69, 88, 65, 66, 39, 97, 27, 29, 78, 5, 49, 82, 54, 46, 51, 28, 98, 36, 48, 15, 2, 50, 38, 24, 89, 59, 8, 3, 18, 47, 10, 90, 21, 80, 73, 33, 85, 62, 19, 37, 57, 95, 60, 20, 99, 17, 63, 56, 84, 44, 40, 70, 9, 30])
        })

        it('extracts the boards', async () => {
            const {boards} = await parse('day-4');
            expect(boards[0]).toStrictEqual([
                [14, 86, 50, 89, 49],
                [10, 85, 33, 46, 87],
                [82, 91, 54, 13, 90],
                [63, 88, 75, 99, 79],
                [74, 31,  4,  0, 71],
            ]);
            expect(boards[1]).toStrictEqual([
                [56,  3, 70,  2, 22],
                [44, 63, 10, 95,  8],
                [92, 62, 83,  4, 93],
                [74, 80,  5, 11, 68],
                [24, 50, 42, 65, 72],
            ]);
        });
    })
})
