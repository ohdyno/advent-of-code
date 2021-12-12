const {
    depthMeasurementIncreases,
    depthMeasurementWindowIncreases,
    calculatePosition
} = require("./Advent");
const fs = require('fs');
const path = require("path");

function readMeasurementsFromInputFile() {
    function readMeasurementFile(filePath) {
        return fs.readFileSync(filePath)
            .toString()
            .split("\n")
            .map(input => Number.parseInt(input))
            .filter(Number.isInteger);
    }

    return readMeasurementFile(path.join(__dirname, 'inputs', 'day-1.txt'));
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

            it('calculates the production inputs', () => {
                const measurements = readMeasurementsFromInputFile();
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

            it('calculates the production inputs', () => {
                const measurements = readMeasurementsFromInputFile();
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

            it('works with commands from a file', () => {
                const position = {
                    horizontal: 0,
                    depth: 0,
                    aim: 0,
                };

                function readCommandsFromInputFile() {
                    const filePath = path.join(__dirname, 'inputs', 'day-2.txt')
                    return fs.readFileSync(filePath)
                        .toString()
                        .split("\n")
                        .filter((command) => command.length > 0);
                }

                const commands = readCommandsFromInputFile()
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
})
