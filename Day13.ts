import * as _ from 'lodash';
import {readFileSync} from 'fs';

//const filename = './Day13Sample.txt';
const filename = './Day13Data.txt';
const data = readFileSync(filename, 'ascii').split(/\r\n/);
const gapIndex = data.findIndex(d => d == '');

interface position {
    row: number;
    col: number;
}
interface fold {
    axis: 'x'|'y';
    position: number;
}

const dots: position[] = data.slice(0, gapIndex).map(line => line.split(',').map(s => parseInt(s))).map(pairs => ({
    row: pairs[1], col: pairs[0]
}));
const folds: fold[] = data.slice(gapIndex+1).map(s => s.replace('fold along ', '').split('=')).map(pairs => ({
    axis: pairs[0] as 'x'|'y', position: parseInt(pairs[1])
}));

const printer = ((dots : position[]) => {
    const lowestRow = _.minBy(dots, dot => dot.row).row;
    const highestRow = _.maxBy(dots, dot => dot.row).row;
    const dotRows = _.range(lowestRow, highestRow+1).map(row => dots.filter(dot => dot.row == row));
    
    const lowestCol = _.minBy(dots, dot => dot.col).col;
    const highestCol = _.maxBy(dots, dot => dot.col).col;
    const columns = _.range(lowestCol, highestCol+1);

    return dotRows.map(rowDots => columns.map(c => rowDots.some(dot => dot.col == c) ? '#' : ' ').join(''));
});

const positionEquals = (a: position, b: position) => a.col == b.col && a.row == b.row;
const foldDotX = (dot: position, fold: fold) => ({
    row: dot.row, 
    col: dot.col < fold.position ? dot.col : fold.position - (dot.col - fold.position)
});
const foldDotY = (dot: position, fold: fold) => ({
    row: dot.row < fold.position ? dot.row : fold.position - (dot.row - fold.position), 
    col: dot.col
});
const foldDot = (dot: position, fold: fold) => fold.axis == 'x' ? foldDotX(dot, fold) : foldDotY(dot, fold);
const doFold = (state: position[], fold: fold) => 
    _.uniqWith(state.filter(dot => dot.col != fold.position).map(d => foldDot(d, fold)), positionEquals);
const outcome = folds.reduce((state, fold) => doFold(state, fold), dots);

console.log("Stage 1: " + doFold(dots, folds[0]).length);
console.log("Stage 2: \n" + printer(outcome).join('\n'));