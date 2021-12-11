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

function move(position, command) {
    return {
        ...position,
        horizontal: 5
    }
}

module.exports = {
    depthMeasurementIncreases,
    depthMeasurementWindowIncreases,
    move
}
