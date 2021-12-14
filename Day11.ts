import * as _ from 'lodash';
import {readFileSync} from 'fs';

//const filename = './Day11Sample.txt';
const filename = './Day11Data.txt';
const data = readFileSync(filename, 'ascii').split(/\r\n/).map(l => l.split('').map(c => parseInt(c)));
const rows = data.length;
const cols = data[0].length;
interface position {
    row: number;
    col: number;
}
interface octopus {
    position: position;
    energy: number;
    lastQueued: number;
}
let octopi: octopus[] = data.flatMap((row, ri) => row.map((val, ci) => ({
    position: {row: ri, col: ci}, 
    energy: val, 
    lastQueued: -1
})));

const index = (position: position) => position.row * cols + position.col;

const isInGrid = (p: position) => p.row >= 0 && p.row < rows && p.col >= 0 && p.col < cols;
const adjacent = (position: position) => [-1, 0, +1].flatMap(r => [-1, 0, +1]
    .map(c => ({row: position.row + r, col: position.col + c})))
    .filter(p => isInGrid(p) && !(p.row == position.row && p.col == position.col));

let totalFlashesInFirstHundred = 0;
let allFlashIteration = -1;
for (let iter = 1; allFlashIteration == -1; iter++) {
    octopi.forEach(o => o.energy+=1);
    let flashQueue = octopi.filter(o => o.energy > 9);
    flashQueue.forEach(o => o.lastQueued = iter);
    while (flashQueue.length > 0) {
        if (iter <= 100) totalFlashesInFirstHundred++;
        const flasher = flashQueue[0];
        var adjacentOctopi = adjacent(flasher.position).map(p => octopi[index(p)]);//?
        adjacentOctopi.forEach(o => o.energy += 1);
        const newFlashers = adjacentOctopi.filter(o => o.lastQueued != iter && o.energy > 9);
        newFlashers.forEach(o => o.lastQueued = iter);
        flashQueue = flashQueue.slice(1).concat(newFlashers);
    }
    if (octopi.every(o => o.lastQueued == iter)) allFlashIteration = iter;
    octopi.filter(o => o.lastQueued == iter).forEach(o => o.energy = 0);
}

console.log("Stage 1: " + totalFlashesInFirstHundred);
console.log("Stage 2: " + allFlashIteration);