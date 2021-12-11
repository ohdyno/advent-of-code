function depthMeasurementIncreases(measurements) {
    const reducer = (previous, current, currentIndex, measurements) => {
        if (current > measurements[currentIndex - 1]) {
            return [...previous, 1];
        }
        return [...previous, 0]
    };

    const increases = measurements.reduce(reducer, []);
    return increases.reduce((a, b) => a + b);
}

function depthMeasurementWindowIncreases(measurements) {
    const reducer = (previous, current, currentIndex, measurements) => {
        const nextWindowEndIndex = currentIndex + 3;
        if (nextWindowEndIndex >= measurements.length) {
            return previous;
        }

        if (measurements[nextWindowEndIndex] > current) {
            return [...previous, 1];
        }
        return [...previous, 0]
    };

    const increases = measurements.reduce(reducer, [0]);
    return increases.reduce((a, b) => a + b);
}

module.exports = {
    depthMeasurementIncreases,
    depthMeasurementWindowIncreases
}
