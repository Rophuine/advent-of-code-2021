import * as _ from 'lodash';
import {readFileSync} from 'fs';

//const filename = './Day7Sample.txt';
const filename = './Day7Data.txt';
const data: number[] = readFileSync(filename, 'ascii').split(',').map(s => parseInt(s));

const range = [_.min(data), _.max(data)];
const positionCandidates = [..._.range(range[0], range[1]), range[1]];
const costs = positionCandidates.map(target => _.sum(data.map(start => Math.abs(target - start))));
console.log("Stage 1 minimum cost: " + _.min(costs));

const fuelCost = (distance: number) => (distance * (distance+1))/2;
const fuelCosts = (target: number) => data.map(start => fuelCost(Math.abs(target - start)));
const stage2Costs = positionCandidates.map(target => _.sum(fuelCosts(target)));
console.log("Stage 2 minimum: " + _.min(stage2Costs));