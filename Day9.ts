import * as _ from 'lodash';
import {readFileSync} from 'fs';

//const filename = './Day9Sample.txt';
const filename = './Day9Data.txt';
interface position {
    row: number;
    col: number;
}
const data = readFileSync(filename, 'ascii').split(/\r\n/).map(l => l.split('').map(n => parseInt(n)));
const rows = data.length;
const cols = data[0].length;

const adjacentPoints = (p: position) => [
    {row: p.row+1, col: p.col}, 
    {row: p.row-1, col: p.col}, 
    {row: p.row, col: p.col+1}, 
    {row: p.row, col: p.col-1}
].filter(p => p.row >= 0 && p.row < rows && p.col >= 0 && p.col < cols);
const allAdjacentsAreHigher = (p: position) => adjacentPoints(p).every(adj => data[adj.row][adj.col] > data[p.row][p.col]);

const allPositions = _.range(0, rows).flatMap(r => _.range(0, cols).map(c => ({row: r, col: c})));
const lowestPoints = allPositions.filter(allAdjacentsAreHigher);
console.log("Stage 1: " + _.sum(lowestPoints.map(p => data[p.row][p.col]+1)));

enum spot { highPoint, unvisited, visited};
const basinMap: spot[] = data.flatMap(row => row.map(depth => depth == 9 ? spot.highPoint : spot.unvisited));
const index = (position: position) => position.row * cols + position.col;
const position = (index: number) => ({row: Math.floor(index / cols), col: index % cols});

const basinSizes: number[] = [];
while (basinMap.some(d => d == spot.unvisited)) {
    let indexQueue = [basinMap.findIndex(s => s == spot.unvisited)];
    let basinSize = 0;
    while (indexQueue.length > 0) {
        if (basinMap[indexQueue[0]] == spot.unvisited) {
            basinSize++;
            basinMap[indexQueue[0]] = spot.visited;
            const newSpots = adjacentPoints(position(indexQueue[0])).filter(p => basinMap[index(p)] == spot.unvisited);
            indexQueue = [...indexQueue.slice(1), ...newSpots.map(index)];
        }
        else
            indexQueue = indexQueue.slice(1);
    }
    basinSizes.push(basinSize);
}
const threeLargest = _.orderBy(basinSizes).slice(-3);
const answer = threeLargest[0]*threeLargest[1]*threeLargest[2];
console.log("Stage 2: " + answer);