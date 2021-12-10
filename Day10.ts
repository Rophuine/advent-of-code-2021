import * as _ from 'lodash';
import {readFileSync} from 'fs';

//const filename = './Day10Sample.txt';
const filename = './Day10Data.txt';
const data = readFileSync(filename, 'ascii').split(/\r\n/).map(l => l.split(''));
const pairs = ['[]', '{}', '()', '<>'].map(p => p.split(''));
const openers = pairs.map(p => p[0]);

interface state {
    stack: string[];
    valid: boolean;
    firstIllegal: string;
}

const valid = data.map(line => 
    line.reduce((state: state, next) => {
        if (openers.includes(next)) {
            const expectedCloser = pairs.find(p => p[0] == next)[1];
            return {...state, stack: [...state.stack, expectedCloser]};
        }
        else {
            const expected = state.stack.slice(-1)[0];
            const valid = state.valid && (expected == next);
            const firstIllegal = (state.valid && (!valid)) ? next : state.firstIllegal;
            return {firstIllegal: firstIllegal, stack: state.stack.slice(0, -1), valid: valid};
        }
    }, { stack: [], valid: true, firstIllegal: '' }));

const scores = {')': 3,']': 57,'}': 1197,'>': 25137};
const invalidLineScores = valid.filter(v => !v.valid).map(v => scores[v.firstIllegal]);
console.log("Stage 1: ", _.sum(invalidLineScores));

const closeScores = { ')': 1, ']': 2, '}': 3, '>': 4 };
const validLines = valid.filter(v => v.valid);
const remaining = validLines.map(l => l.stack);
const completeScores = remaining.map(line => {
    return line.reduceRight((state, next) => {
        return state*5 + closeScores[next]
    }, 0);
});
const answer = _.orderBy(completeScores)[Math.floor(completeScores.length/2)];
console.log("Stage 2: ", answer);