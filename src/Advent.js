const assert = require("assert");

function calculateDepthMeasurementIncreases(measurements, stepSize) {
    const reducer = (previous, current, currentIndex, measurements) => {
        const nextSignificantMeasurementIndex = currentIndex + stepSize;
        if (nextSignificantMeasurementIndex >= measurements.length) {
            return previous;
        }

        if (measurements[nextSignificantMeasurementIndex] > current) {
            return [...previous, 1];
        }
        return [...previous, 0]
    };

    const increases = measurements.reduce(reducer, [0]);
    return increases.reduce((a, b) => a + b);
}

function depthMeasurementIncreases(measurements) {
    return calculateDepthMeasurementIncreases(measurements, 1);
}

function depthMeasurementWindowIncreases(measurements) {
    return calculateDepthMeasurementIncreases(measurements, 3);
}

function calculatePosition(position, commands) {
    function move(position, command) {
        function parse(command) {
            const pattern = /(?<direction>\w+)\s+(?<unit>\d+)/;
            const matches = command.match(pattern);
            return {
                direction: matches.groups.direction,
                unit: Number.parseInt(matches.groups.unit)
            };
        }

        function updatePosition(position, direction, unit) {
            switch (direction) {
                case 'forward':
                    return {
                        ...position,
                        horizontal: position.horizontal + unit,
                        depth: position.depth + unit * position.aim
                    }
                case 'down':
                    return {
                        ...position,
                        aim: position.aim + unit
                    }
                default:
                    return {
                        ...position,
                        aim: position.aim - unit
                    };
            }
        }

        const {direction, unit} = parse(command);

        return updatePosition(position, direction, unit);
    }

    return commands.reduce(move, position)
}

function calculatePowerConsumption(report) {
    /**
     * Find most common bits for each bit location. If there is an equal number of 1s and 0s
     * for a bit, mark that bit location with a NaN.
     */
    function findMostCommonBits(report) {
        /**
         * For each bit in the report, calculate count(1) - count(0).
         */
        function calculatePositiveNegativeDifferencesForEachBit(report) {
            const bits = new Array(report[0].length).fill(0);
            report.forEach(number => {
                [...number].forEach((digit, index) => {
                    if (Number.parseInt(digit) === 0) {
                        bits[index]--;
                    } else {
                        bits[index]++;
                    }
                })
            })
            return bits;
        }

        const bits = calculatePositiveNegativeDifferencesForEachBit(report);

        return bits.map(bit => {
            if (bit === 0) {
                return Number.NaN
            }

            if (bit > 0) {
                return 1;
            }

            return 0;
        })
    }

    function convertToGammaRate(weights) {
        const bitRepresentation = weights.map(weight => Number.isNaN(weight) ? 1 : weight).join('');
        return Number.parseInt(bitRepresentation, 2)
    }

    function convertToEpsilonRate(weights) {
        const bitRepresentation = weights
            .map(weight => {
                if (Number.isNaN(weight)) {
                    return 0
                }
                return weight === 0 ? 1 : 0;
            }).join('');
        return Number.parseInt(bitRepresentation, 2)
    }

    const mostCommonBits = findMostCommonBits(report);
    return convertToGammaRate(mostCommonBits) * convertToEpsilonRate(mostCommonBits);
}

function calculateLifeSupportRating(report) {
    // Take each index, sort each reading into 1s and 0s bucket. The bigger bucket is used for next recursion.
    // Recursion stops when the bigger bucket is of size one.

    function calculateOxygenGeneratorRating(readings, index) {
        if (readings.length === 1) {
            return readings[0];
        }

        function bucketSortAtIndex(readings, index) {
            const ones = []
            const zeros = []
            readings.forEach(reading => {
                if (reading.charAt(index) === '0') {
                    zeros.push(reading)
                } else {
                    ones.push(reading)
                }
            })
            return [ones, zeros];
        }

        const [ones, zeros] = bucketSortAtIndex(readings, index);
        if (ones.length >= zeros.length) {
            return calculateOxygenGeneratorRating(ones, index+1);
        }
        return calculateOxygenGeneratorRating(zeros, index+1);
    }

    return calculateOxygenGeneratorRating(report, 0);
}

module.exports = {
    depthMeasurementIncreases,
    depthMeasurementWindowIncreases,
    calculatePosition,
    calculatePowerConsumption,
    calculateLifeSupportRating,
}
