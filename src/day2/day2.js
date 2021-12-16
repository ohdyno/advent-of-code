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

module.exports = {
    calculatePosition
}