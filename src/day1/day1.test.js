const {depthMeasurementIncreases, depthMeasurementWindowIncreases} = require("./day1");
const parse = require("../InputParser");

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
