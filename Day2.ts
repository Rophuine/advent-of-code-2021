import * as _ from 'lodash';
import {readFileSync} from 'fs';

interface movement {
    direction: string;
    distance: number;
}

interface position {
    horizontal: number;
    depth: number;
}

interface positionWithAim extends position {
    aim: number;
}

const filename = './Day2Sample.txt';
const data: movement[] = readFileSync(filename, 'ascii').split(/\r\n/).map(s => s.split(' ')).map(array => ({direction: array[0], distance: parseInt(array[1])}));

const moveFunction = (state: position, step: movement) => {
    switch (step.direction) {
        case 'forward': return {...state, horizontal: state.horizontal + step.distance};
        case 'up': return {...state, depth: state.depth - step.distance};
        case 'down': return {...state, depth: state.depth + step.distance};
    }
    throw new Error('Bad direction!');
};

let finalLocation = _.reduce(data, moveFunction, {horizontal: 0, depth: 0});
console.log(finalLocation.depth * finalLocation.horizontal);

const stage2MoveFunction = (state: positionWithAim, step: movement) => {
    switch (step.direction) {
        case 'forward': return {...state, horizontal: state.horizontal + step.distance, depth: state.depth + (state.aim * step.distance)};
        case 'up': return {...state, aim: state.aim - step.distance};
        case 'down': return {...state, aim: state.aim + step.distance};
    }
    throw new Error('Bad direction!');
};

let stage2FinalLocation = _.reduce(data, stage2MoveFunction, {horizontal: 0, depth: 0, aim: 0});
console.log(stage2FinalLocation.depth * stage2FinalLocation.horizontal);