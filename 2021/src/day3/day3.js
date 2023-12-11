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
    function partitionIntoOnesAndZeros(readings, index) {
        return readings.reduce(([ones, zeros], current) => {
            if (current.charAt(index) === '0') {
                return [ones, [...zeros, current]]
            } else {
                return [[...ones, current], zeros]
            }
        }, [[], []])
    }

    function calculateOxygenGeneratorRating(readings, index) {
        if (readings.length === 1) {
            return Number.parseInt(readings[0], 2);
        }

        const [ones, zeros] = partitionIntoOnesAndZeros(readings, index);
        const bigger = ones.length >= zeros.length ? ones : zeros;
        return calculateOxygenGeneratorRating(bigger, index + 1);
    }

    function calculateCO2ScrubberRating(readings, index) {
        if (readings.length === 1) {
            return Number.parseInt(readings[0], 2);
        }

        const [ones, zeros] = partitionIntoOnesAndZeros(readings, index);
        const smaller = zeros.length <= ones.length ? zeros : ones;
        return calculateCO2ScrubberRating(smaller, index + 1);
    }

    return calculateOxygenGeneratorRating(report, 0) * calculateCO2ScrubberRating(report, 0);
}

module.exports = {
    calculatePowerConsumption,
    calculateLifeSupportRating,
}
