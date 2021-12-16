const {
    calculatePowerConsumption,
    calculateLifeSupportRating,
    calculateBingoBoardScore,
} = require("./Advent");

const parse = require("../InputParser");

describe('Advent of Code 2021', () => {

    describe('day 3', () => {
        describe('calculate power consumption', () => {
            it('calculates from an array', () => {
                const report = [
                    "00010",
                    "00100",
                    "00111",
                    "01010",
                    "01111",
                    "10000",
                    "10101",
                    "10110",
                    "10111",
                    "11001",
                    "11100",
                    "11110",
                ]
                const result = calculatePowerConsumption(report);
                expect(result).toBe(198)
            })

            it('calculates from the input file', async () => {
                const report = await parse('day-3')
                const result = calculatePowerConsumption(report);
                expect(result).toBe(3969000)
            })
        });

        describe('calculate life support rating', () => {
            it('calculates from an array', () => {
                const report = [
                    "00010",
                    "00100",
                    "00111",
                    "01010",
                    "01111",
                    "10000",
                    "10101",
                    "10110",
                    "10111",
                    "11001",
                    "11100",
                    "11110",
                ]
                const result = calculateLifeSupportRating(report);
                expect(result).toBe(230)
            })

            it('calculates from the input file', async () => {
                const report = await parse('day-3')
                const result = calculateLifeSupportRating(report);
                expect(result).toBe(4267809)
            })
        });
    })

    describe('day 4', () => {
        describe('calculating the final score for the winning bingo board', () => {
            it('calculates the winning board score', () => {
                const input = {
                    numbersDrawn: [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1],
                    boards: [
                        [
                            [22, 13, 17, 11, 0],
                            [8, 2, 23, 4, 24],
                            [21, 9, 14, 16, 7],
                            [6, 10, 3, 18, 5],
                            [1, 12, 20, 15, 19],
                        ],
                        [
                            [3, 15, 0, 2, 22],
                            [9, 18, 13, 17, 5],
                            [19, 8, 7, 25, 23],
                            [20, 11, 10, 24, 4],
                            [14, 21, 16, 12, 6],
                        ],
                        [
                            [14, 21, 17, 24, 4],
                            [10, 16, 15, 9, 19],
                            [18, 8, 23, 26, 20],
                            [22, 11, 13, 6, 5],
                            [2, 0, 12, 3, 7],
                        ],
                    ]
                }

                expect(calculateBingoBoardScore(input, true)).toStrictEqual(4512)
                expect(calculateBingoBoardScore(input, false)).toStrictEqual(1924)
            })

            it('calculates the winning board score from input file', async () => {
                const input = await parse('day-4')
                expect(calculateBingoBoardScore(input, true)).toStrictEqual(32844)
                expect(calculateBingoBoardScore(input, false)).toStrictEqual(4920)
            })
        });
    })
})
