import * as _ from 'lodash';
import {readFileSync} from 'fs';

//const filename = './Day14Sample.txt';
const filename = './Day14Data.txt';
const data = readFileSync(filename, 'ascii').split(/\r\n/);
const template = data[0];
const templatePairs = template.split('').map((_, index, arr) => arr.slice(index, index+2).join('')).filter(s => s.length == 2);
const rules = _.fromPairs(data.slice(2).map(line => line.split(' -> ')));
const elements = _.uniq([...template.split(''), ...Object.values(rules)]);

type state = [string, number][];
const templateCounts: state = _(templatePairs).countBy().toPairs().value();

const getNewPairs = (pair: string) => {
    return [pair[0]+rules[pair], rules[pair]+pair[1]];
}
const nextIteration = (state: state) => {
    const newStateUncombined = state.flatMap(s => rules[s[0]] === undefined ? [s] : getNewPairs(s[0]).map(pair => [pair, s[1]]));
    return _(newStateUncombined).groupBy(p => p[0]).mapValues(v => _(v).map(p => p[1]).sum()).toPairs().value();
}

const stage1Polymer = _.range(0, 10).reduce(nextIteration, templateCounts);

const lastItem = template[template.length-1];
const getMostCommonMinusLeast = (polymer: state) => {
    const counts = elements.map(e => ({
        element: e,
        count: _.sumBy(polymer.filter(p => p[0][0] == e), pair => pair[1]) + (e == lastItem ? 1 : 0)
    }));
    const mostCommon = _.maxBy(counts, c => c.count)!.count;
    const leastCommon = _.minBy(counts, c => c.count)!.count;
    return mostCommon - leastCommon;
}

console.log("Stage 1: " + getMostCommonMinusLeast(stage1Polymer));

const stage2Polymer = _.range(0, 30).reduce(nextIteration, stage1Polymer);
console.log("Stage 2: " + getMostCommonMinusLeast(stage2Polymer));