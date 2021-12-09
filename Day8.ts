import * as _ from 'lodash';
import {readFileSync} from 'fs';

//const filename = './Day8Sample.txt';
const filename = './Day8Data.txt';
const data = readFileSync(filename, 'ascii').split(/\r\n/);
const samples = data.map(d => {
    const split = d.split('|');
    return {
        patterns: split[0].trim().split(' '),
        output: split[1].trim().split(' ')
    }
});

const targetCounts = ['2','3','4','7'];
var allOutputs = samples.flatMap(s => s.output);
const counts = _(allOutputs).countBy(o => o.length).toPairs().value();
const targets = counts.filter(c => targetCounts.includes(c[0]));
const totalCount = _.sumBy(targets, t => t[1]);
console.log("Stage 1: " + totalCount);

let outputs = samples.map(s => {
    const withChars = (chars: number) => s.patterns.filter(p => p.length == chars).map(c => c.split(''));
    let one = withChars(2)[0];
    let cf = [...one];
    let seven = withChars(3)[0];
    let a = _.difference(seven, one)[0];
    let four = withChars(4)[0];
    let bd = _.difference(four, cf);
    let twothreefive = withChars(5);
    let egFilter = twothreefive.map(ttf => _.difference(ttf, [a], bd, cf));
    let g = egFilter.filter(f => f.length == 1)[0][0];
    let e = _.difference(egFilter.filter(f => f.length == 2)[0], [g])[0];
    let bdFilter = _.map(twothreefive, ttf => _.difference(ttf, [a, e, g], cf));
    let d = bdFilter.filter(f => f.length == 1)[0][0];
    let b = _.difference(bdFilter.filter(f => f.length == 2)[0], [d])[0];
    let zerosixnine = withChars(6);
    let cfFilter = zerosixnine.map(zsn => _.difference(zsn, [a, b, d, e, g]));
    let f = cfFilter.filter(f => f.length == 1)[0][0];
    let c = _.difference(cfFilter.filter(f => f.length == 2)[0], [f])[0];
    let patternMapper = [
        [a,b,c,e,f,g],
        [c,f],
        [a,c,d,e,g],
        [a,c,d,f,g],
        [b,c,d,f],
        [a,b,d,f,g],
        [a,b,d,e,f,g],
        [a,c,f],
        [a,b,c,d,e,f,g],
        [a,b,c,d,f,g]
    ];
    let stringMapper = (p) => _.findIndex(patternMapper, (map) => map.length == p.length && map.every(m => p.includes(m)));
    let decoded = s.output.map(o => stringMapper(o)).join('');
    return parseInt(decoded);
});
console.log("Stage 2: " + _.sum(outputs));