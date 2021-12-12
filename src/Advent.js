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

        const {direction, unit} = parse(command);

        function apply(position, direction, unit) {
            if ("forward".includes(direction)) {
                return {
                    ...position,
                    horizontal: position.horizontal + unit,
                    depth: position.depth + unit * position.aim
                }
            }

            if ("down".includes(direction)) {
                return {
                    ...position,
                    aim: position.aim + unit
                }
            }

            return {
                ...position,
                aim: position.aim - unit
            };
        }

        return apply(position, direction, unit);
    }

    return commands.reduce((position, command) => move(position, command), position)
}

function calculatePowerConsumption(report) {
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

        return bits.map(bit => bit >= 0 ? 1 : 0)
    }

    function convertToGammaRate(weights) {
        return Number.parseInt(weights.join(''), 2)
    }

    function convertToEpsilonRate(weights) {
        return Number.parseInt(weights.map(weight => weight === 0 ? 1 : 0).join(''), 2)
    }

    const mostCommonBits = findMostCommonBits(report);
    return convertToGammaRate(mostCommonBits) * convertToEpsilonRate(mostCommonBits);
}

module.exports = {
    depthMeasurementIncreases,
    depthMeasurementWindowIncreases,
    calculatePosition,
    calculatePowerConsumption,
}
