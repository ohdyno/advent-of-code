const {calculateBingoBoardScore, sumBoards, locateAllNumbers} = require("./day4");

const parse = require("../inputs/parser");

describe('day 4', () => {
    xdescribe('calculating the final score for the winning bingo board', () => {
        it('calculates the winning board score', () => {
            const input = {
                numbersDrawn: [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1],
                boards: [
                    [
                        [22, 13, 17, 11, 0],
                        [8, 2, 23, 4, 24],
                        [21, 9, 14, 16, 7],
                        [6, 10, 3, 18, 5],
                        [1, 12, 20, 15, 19],
                    ],
                    [
                        [3, 15, 0, 2, 22],
                        [9, 18, 13, 17, 5],
                        [19, 8, 7, 25, 23],
                        [20, 11, 10, 24, 4],
                        [14, 21, 16, 12, 6],
                    ],
                    [
                        [14, 21, 17, 24, 4],
                        [10, 16, 15, 9, 19],
                        [18, 8, 23, 26, 20],
                        [22, 11, 13, 6, 5],
                        [2, 0, 12, 3, 7],
                    ],
                ]
            }

            expect(calculateBingoBoardScore(input, true)).toStrictEqual(4512)
            expect(calculateBingoBoardScore(input, false)).toStrictEqual(1924)
        })

        it('calculates the winning board score from input file', async () => {
            const input = await parse('day-4')
            expect(calculateBingoBoardScore(input, true)).toStrictEqual(32844)
            expect(calculateBingoBoardScore(input, false)).toStrictEqual(4920)
        })
    });

    it('calculate the sum of boards', () => {
        const boards = [
            [
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
            ],
            [
                [10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10],
            ],
        ]

        const result = sumBoards(boards);

        expect(result).toStrictEqual([25, 250])
    })

    it('calculate where each number is on a single board', () => {
        const boards = [
            [
                [22, 13, 17, 11, 0],
                [8, 2, 23, 4, 24],
                [21, 9, 14, 16, 7],
                [6, 10, 3, 18, 5],
                [1, 12, 20, 15, 19],
            ],
        ]

        const result = locateAllNumbers(boards);

        expect(result).toStrictEqual([
            {
                22: [0, 0],
                13: [0, 1],
                17: [0, 2],
                11: [0, 3],
                0: [0, 4],
                8: [1, 0],
                2: [1, 1],
                23: [1, 2],
                4: [1, 3],
                24: [1, 4],
                21: [2, 0],
                9: [2, 1],
                14: [2, 2],
                16: [2, 3],
                7: [2, 4],
                6: [3, 0],
                10: [3, 1],
                3: [3, 2],
                18: [3, 3],
                5: [3, 4],
                1: [4, 0],
                12: [4, 1],
                20: [4, 2],
                15: [4, 3],
                19: [4, 4],
            },
        ])
    });
})
