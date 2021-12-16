const {
    calculatePowerConsumption,
    calculateLifeSupportRating,
    calculateBingoBoardScore,
} = require("./day3");

const parse = require("../inputs/parser");

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
})
