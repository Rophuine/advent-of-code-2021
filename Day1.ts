import * as _ from 'lodash';
import {readFileSync} from 'fs';

const data = readFileSync('./Day1Data.txt', 'ascii').split(/\W+/).map(t => parseInt(t));

interface IArrayState {
    previous: number[];
    increaseCount: number;
}

const nPointIncreaseCounter = (state: IArrayState, value: number) => {
    const previousSum = _.sum(state.previous);
    const newArray = _.slice([...state.previous, value], 1);
    const newSum = _.sum(newArray);
    return {previous: newArray, increaseCount: newSum > previousSum ? state.increaseCount+1 : state.increaseCount};
}

// Create a solver which selects n initial depths as the previous state, and passes the rest of the array to reduce to count the increases.
const solver = (n: number) => _.reduce(_.slice(data, n), nPointIncreaseCounter, {previous: _.slice(data, 0, n), increaseCount: 0});

const stage1 = solver(1);
console.log(stage1.increaseCount);

const stage2 = solver(3);
console.log(stage2.increaseCount);