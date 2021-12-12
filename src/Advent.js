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
    function weighEachBit(report) {
        const sumOfEachBit = [];
        report.map(number => {
            [...number].forEach((digit, index) => {
                const value = Number.parseInt(digit);
                if (index >= sumOfEachBit.length) {
                    sumOfEachBit.push(value);
                } else {
                    sumOfEachBit[index] += value
                }
            })
        })
        for (let i = 0; i < sumOfEachBit.length; i++) {
            sumOfEachBit[i] -= report.length / 2
        }
        return sumOfEachBit;
    }

    function convertWeightsToBits(weight, positiveBitValue, negativeBitValue) {
        let bits = '';
        for (let i = 0; i < weight.length; i++) {
            if (weight[i] > 0) {
                bits += positiveBitValue
            } else {
                bits += negativeBitValue
            }
        }
        return bits;
    }

    function calculateMostCommonBits(weight) {
        return convertWeightsToBits(weight, "1", "0");
    }

    function calculateLeastCommonBits(weight) {
        return convertWeightsToBits(weight, "0", "1");
    }

    const bitWeight = weighEachBit(report);
    const mostCommonBits = calculateMostCommonBits(bitWeight);
    const leastCommonBits = calculateLeastCommonBits(bitWeight);

    return Number.parseInt(mostCommonBits, 2) * Number.parseInt(leastCommonBits, 2)
}

module.exports = {
    depthMeasurementIncreases,
    depthMeasurementWindowIncreases,
    calculatePosition,
    calculatePowerConsumption,
}
