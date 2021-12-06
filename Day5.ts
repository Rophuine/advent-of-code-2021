import * as _ from 'lodash';
import {readFileSync} from 'fs';

//const filename = './Day5Sample.txt';
const filename = './Day5Data.txt';
const data: string[] = readFileSync(filename, 'ascii').split(/\r\n/);

interface point {
    x: number;
    y: number;
}

const lineStrings = data.map(l => l.split(/\s+\-\>\s+/));
const lines = lineStrings.map(pairStrings => pairStrings.map(pairString => pairString.split(',')).map(p => ({x: parseInt(p[0]), y: parseInt(p[1])})));

const sameX = (points: point[]) => points[0].x == points[1].x;
const sameY = (points: point[]) => points[0].y == points[1].y;

const nonDiagonalLines = lines.filter(l => sameX(l) || sameY(l));

const unzipAndMap = (xPoints: number[], yPoints: number[]) => _.unzip([xPoints, yPoints]).map((xy) => ({x: xy[0], y: xy[1]}));
const fillChangingY = (ends: point[]): point[] => {
    const yPoints = [..._.range(ends[0].y, ends[1].y), ends[1].y];
    const xPoints = yPoints.map(x => ends[0].x);
    return unzipAndMap(xPoints, yPoints);
}
const fillChangingX = (ends: point[]): point[] => {
    const xPoints = [..._.range(ends[0].x, ends[1].x), ends[1].x];
    const yPoints = xPoints.map(x => ends[0].y);
    return unzipAndMap(xPoints, yPoints);
}
const fillChangingBoth = (ends: point[]): point[] => {
    const xPoints = [..._.range(ends[0].x, ends[1].x), ends[1].x];
    const yPoints = [..._.range(ends[0].y, ends[1].y), ends[1].y];
    return unzipAndMap(xPoints, yPoints);
}
const filledLine = (ends: point[]) => {
    if (ends[0].x == ends[1].x) return fillChangingY(ends);
    else if (ends[0].y == ends[1].y) return fillChangingX(ends);
    else return fillChangingBoth(ends);
};

const filledNonDiagLines = nonDiagonalLines.flatMap(ends => filledLine(ends)).map(p => `${p.x},${p.y}`);
const nonDiagDupeCount = _(filledNonDiagLines).countBy().pickBy((value, key) => value > 1).keys().value().length;
console.log("Stage 1: " + nonDiagDupeCount);

const filledLines = lines.flatMap(ends => filledLine(ends)).map(p => `${p.x},${p.y}`);
const dupeCount = _(filledLines).countBy().pickBy((value, key) => value > 1).keys().value().length;
console.log("Stage 2: " + dupeCount);