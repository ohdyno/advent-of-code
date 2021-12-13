const parse = require('./InputParser')

describe('Input file parser', () => {
    describe('day 4 inputs', () => {
        it('extracts the numbers drawn', async () => {
            const {numbersDrawn} = await parse('day-4');
            expect(numbersDrawn).toEqual("13,79,74,35,76,12,43,71,87,72,23,91,31,67,58,61,96,16,81,92,41,6,32,86,77,42,0,55,68,14,53,26,25,11,45,94,75,1,93,83,52,7,4,22,34,64,69,88,65,66,39,97,27,29,78,5,49,82,54,46,51,28,98,36,48,15,2,50,38,24,89,59,8,3,18,47,10,90,21,80,73,33,85,62,19,37,57,95,60,20,99,17,63,56,84,44,40,70,9,30".split(','))
        })
    })
})
