const {
    depthMeasurementIncreases,
    depthMeasurementWindowIncreases,
    calculatePosition,
    calculatePowerConsumption,
    calculateLifeSupportRating,
} = require("./Advent");
const fs = require('fs');
const path = require("path");
const parse = require("./InputParser");

function readInputFile(fileName) {
    const filePath = path.join(__dirname, 'inputs', `${fileName}.txt`)
    return fs.readFileSync(filePath)
        .toString()
        .split("\n")
        .filter((command) => command.length > 0);
}

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

            it('calculates from the input file', () => {
                const report = readInputFile('day-3')
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

            it('calculates from the input file', () => {
                const report = readInputFile('day-3')
                const result = calculateLifeSupportRating(report);
                expect(result).toBe(4267809)
            })
        });
    })

    describe('day 4', () => {
        it('calculates the final score for the winning bingo board', function () {

        });
    })
})
