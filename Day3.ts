import * as _ from 'lodash';
import {readFileSync} from 'fs';

//const filename = './Day3Sample.txt';
const filename = './Day3Data.txt';
const data: string[] = readFileSync(filename, 'ascii').split(/\r\n/);
const commonBits = (values: string[], n: number) => values.map(d => d[n]);

// For each item in counts, grab the most/least common bit and add it to the string
const mostCommon = (counts: _.Dictionary<number>) => Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
const leastCommon = (counts: _.Dictionary<number>) => Object.keys(counts).reduce((a, b) => counts[a] < counts[b] ? a : b);
 
const gammaBitValue = (bit: number) => {
    const counts = _.countBy(commonBits(data, bit));
    const gammaBit = mostCommon(counts);
    return gammaBit;
}

const epsilonBitValue = (bit: number) => {
    const counts = _.countBy(commonBits(data, bit));
    const epsilonBit = leastCommon(counts);
    return epsilonBit;
}

const bitPositions = Array.from(Array(12).keys());//?
const gamma = bitPositions.map(i => gammaBitValue(i)).reduce((state, val) => state + val);//?
if (gamma != '000110001010') throw Error("Gamma is wrong!");
const epsilon = bitPositions.map(i => epsilonBitValue(i)).reduce((state, val) => state + val);//?
if (epsilon != '111001110101') throw Error("Epsilon is wrong!");
console.log("Stage 1: " + parseInt(gamma, 2) * parseInt(epsilon, 2));

const filterOxygen = (data: string[], bit: number) => {
    const commonBitValues = commonBits(data, bit);
    const counts = [commonBitValues.filter(v => v == '0').length, commonBitValues.filter(v => v == '1').length];

    let output: string[] = null;
    if (counts['0'] > counts['1']) output = data.filter(d => d[bit] == '0');
    else output = data.filter(d => d[bit] == '1');
    return output;
}

const filterScrubber = (data: string[], bit: number) => {
    const commonBitValues = commonBits(data, bit);
    const counts = [commonBitValues.filter(v => v == '0').length, commonBitValues.filter(v => v == '1').length];
    
    let output: string[] = null;
    if (counts['0'] <= counts['1']) output = data.filter(d => d[bit] == '0');
    else output = data.filter(d => d[bit] == '1');
    return output;
}

let oxygenCandidates = [...data];
let oxygenBit = 0;
while (oxygenCandidates.length > 1) {
    oxygenCandidates = filterOxygen(oxygenCandidates, oxygenBit);
    oxygenBit += 1;
}

let scrubberCandidates = [...data];
let scrubberBit = 0;
while (scrubberCandidates.length > 1) {
    scrubberCandidates = filterScrubber(scrubberCandidates, scrubberBit);
    scrubberBit += 1;
}

const oxygen = parseInt(oxygenCandidates[0], 2);
const scrubber = parseInt(scrubberCandidates[0], 2);
console.log("Stage 2: " + oxygen * scrubber);