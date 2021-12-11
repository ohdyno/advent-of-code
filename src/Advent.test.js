const {depthMeasurementIncreases} = require("./Advent");
const fs = require('fs');
const path = require("path");

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
                function readMeasurementFile(filePath) {
                    return fs.readFileSync(filePath)
                        .toString()
                        .split("\n")
                        .map(input => Number.parseInt(input))
                        .filter(Number.isInteger);
                }

                const measurements = readMeasurementFile(path.join(__dirname, 'inputs', 'day-1.txt'));
                const result = depthMeasurementIncreases(measurements);
                expect(result).toBe(1451);
            });
        })
    })
})
