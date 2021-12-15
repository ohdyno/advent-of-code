const {
    depthMeasurementIncreases,
    depthMeasurementWindowIncreases,
    calculatePosition,
    calculatePowerConsumption,
    calculateLifeSupportRating,
    calculateBingoBoardScore,
} = require("./Advent");

const parse = require("./InputParser");

describe('Advent of Code 2021', () => {
    describe('day 1', () => {
        describe('counting the number of times a depth measurement increases', () => {
            it('works for a single measurement', () => {
                const measurements = [199];
                const result = depthMeasurementIncreases(measurements);
                expect(result).toBe(0);
            })

            it('works for multiple measurements', () => {
                const measurements = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
                const result = depthMeasurementIncreases(measurements);
                expect(result).toBe(7);
            })

            it('calculates the production inputs', async () => {
                const measurements = await parse('day-1');
                const result = depthMeasurementIncreases(measurements);
                expect(result).toBe(1451);
            });
        })

        describe('counting the number of times a depth measurement increases in a three number sliding window', () => {
            it('works for a single window', () => {
                const measurements = [199, 200, 208];
                const result = depthMeasurementWindowIncreases(measurements);
                expect(result).toBe(0);
            })

            it('works for multiple windows', () => {
                const measurements = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
                const result = depthMeasurementWindowIncreases(measurements);
                expect(result).toBe(5);
            })

            it('calculates the production inputs', async () => {
                const measurements = await parse('day-1');
                const result = depthMeasurementWindowIncreases(measurements);
                expect(result).toBe(1395);
            });
        })
    })

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
                expect(calculateBingoBoardScore(input, false)).toStrictEqual(9075)
            })
        });
    })
})
