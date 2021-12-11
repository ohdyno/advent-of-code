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
                horizontal: position.horizontal + unit
            }
        }

        if ("down".includes(direction)) {
            return {
                ...position,
                depth: position.depth + unit
            }
        }

        return {
            ...position,
            depth: position.depth - unit
        };
    }

    return apply(position, direction, unit);
}

module.exports = {
    depthMeasurementIncreases,
    depthMeasurementWindowIncreases,
    move
}
