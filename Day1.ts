import * as _ from 'lodash';
import data from './Day1Sample';

// Stage 1
interface IState {
    previous: number;
    increaseCount: number;
}
const increaseCounter = (state: IState, value: number) => ({previous: value, increaseCount: value > state.previous ? state.increaseCount+1 : state.increaseCount});
// Call reduce on the data except the first element, with the first element as the first "previous" element in state.
const stage1 = _.reduce(_.slice(data, 1), increaseCounter, {previous: data[0], increaseCount: 0});

console.log(stage1.increaseCount);

// Stage 2
interface IArrayState {
    previous: number[];
    increaseCount: number;
}

const threePointIncreaseCounter = (state: IArrayState, value: number) => {
    const previousSum = _.sum(state.previous);
    const newArray = _(state.previous).slice(1).concat([value]).value();
    const newSum = _.sum(newArray);
    return ({previous: newArray, increaseCount: newSum > previousSum ? state.increaseCount+1 : state.increaseCount});
}
// Call reduce on the data after the first 3 elements, with the first 3 elements as the "previous" items in state.
const stage2 = _.reduce(_.slice(data, 3), threePointIncreaseCounter, {previous: _.slice(data, 0, 3), increaseCount: 0});

console.log(stage2.increaseCount);