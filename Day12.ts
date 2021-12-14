import * as _ from 'lodash';
import {readFileSync} from 'fs';

//const filename = './Day12Sample.txt';
//const filename = './Day12Sample2.txt';
//const filename = './Day12Sample3.txt';
const filename = './Day12Data.txt';
const edges = readFileSync(filename, 'ascii').split(/\r\n/).map(s => s.split('-'));

const nodes = _.uniq(edges.flat());
const pathsFromNode = _.fromPairs(nodes.map(node => [
    node, 
    _.uniq(edges.filter(edge => edge.some(edgeNode => edgeNode == node)).flat()).filter(n => n != node && n != 'start')
]));
pathsFromNode['end'] = [];

const isLargeCave = (c: string) => c == c.toUpperCase();
const canVisit = (path: string[], node: string) => isLargeCave(node) || !path.includes(node);
const canVisitStage2 = (path: string[], node: string) => {
    const smallCaveVisits = _.countBy(path.filter(n => n != 'start' && !isLargeCave(n)));
    const hasDoubleSmallCaveVisit = _.max(Object.values(smallCaveVisits)) > 1;
    return (isLargeCave(node) || (!hasDoubleSmallCaveVisit) || !path.includes(node))
};
const getAllPaths = (canVisitFunction) => {
    let paths = [['start']];
    while (paths.some(p => p[p.length-1] != 'end')) {
        paths = paths.flatMap((path) : string[][] => {
            if (path[path.length-1] == 'end') return [path];
            return pathsFromNode[path[path.length-1]].filter(n => canVisitFunction(path, n)).map(n => [...path, n]);//?
        });
    }
    return paths;
}

console.log("Stage 1: " + getAllPaths(canVisit).length);
console.log("Stage 2: " + getAllPaths(canVisitStage2).length);