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

function calculateBingoBoardScore({numbersDrawn, boards}) {
    function play(numbersDrawn, boards) {
        function processBoards(boards) {
            return boards.map(board => {
                /**
                 * Map the location (row, column) for each number on the board
                 */
                function mapEntries(board) {
                    return board.reduce((numberLocations, row, rowIndex) => {
                        const locationsForNumbersInRow = row.map((number, columnIndex) => ({
                            number,
                            location: {
                                row: rowIndex,
                                column: columnIndex
                            }
                        }));

                        return locationsForNumbersInRow.reduce((locations, {number, location}) => {
                            const previousLocations = locations[number] || [];
                            return {
                                ...locations,
                                [number]: [...previousLocations, location]
                            }
                        }, numberLocations)
                    }, {})
                }

                /**
                 * Calculate the sum of all numbers on the board.
                 */
                function sum(board) {
                    return board.flat().reduce((a, b) => a + b);
                }

                return {
                    locations: mapEntries(board),
                    score: {
                        rows: [0, 0, 0, 0, 0],
                        columns: [0, 0, 0, 0, 0],
                    },
                    sum: sum(board),
                    bingo: false,
                    numbers: []
                }
            });
        }

        function processNumbersDrawn(numbersDrawn, processedBoards) {
            return Array.from(new Set(numbersDrawn)).reduce((processed, number) =>
                processed.map(board => {
                    if (board.bingo || !board.locations[number]) {
                        return board
                    }

                    const score = board.locations[number].reduce((score, coordinate) => {
                        return {
                            rows: score.rows.map((count, row) => row === coordinate.row ? count + 1 : count),
                            columns: score.columns.map((count, column) => column === coordinate.column ? count + 1 : count)
                        }
                    }, board.score);

                    return {
                        ...board,
                        sum: board.sum - number,
                        numbers: [...board.numbers, number],
                        score,
                        bingo: score.rows.some(count => count === 5) || score.columns.some(count => count === 5)
                    };
                }), processedBoards);
        }

        const processedBoards = processBoards(boards);
        return processNumbersDrawn(numbersDrawn, processedBoards);
    }

    function sortByQuickestToWin(result) {
        return result.filter(({bingo}) => bingo).sort((a, b) => a.numbers.length - b.numbers.length);
    }

    const result = play(numbersDrawn, boards);
    const winningBoard = sortByQuickestToWin(result).at(0)
    return winningBoard.sum * winningBoard.numbers.at(-1);
}

module.exports = {
    depthMeasurementIncreases,
    depthMeasurementWindowIncreases,
    calculatePosition,
    calculatePowerConsumption,
    calculateLifeSupportRating,
    calculateBingoBoardScore,
}
