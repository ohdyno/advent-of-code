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

module.exports = {
    depthMeasurementIncreases
}
