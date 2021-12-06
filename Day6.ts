import * as _ from 'lodash';
import {readFileSync} from 'fs';

//const filename = './Day6Sample.txt';
const filename = './Day6Data.txt';
const data: number[] = readFileSync(filename, 'ascii').split(',').map(s => parseInt(s));

{ // Stage 1
    const fishStep = (age: number) : number[] => {
        if (age == 0) return [6, 8];
        return [age-1];
    }
    let school = data;
    for (let day: number = 0; day < 80; day++) {
        school = _.flatMap(school, fish => fishStep(fish)); // flatMap is magical for this kind of operation :)
    }
    console.log("Stage 1: " + school.length);
}

{ // Stage 2
    let school = _.toPairs(_.countBy([...data,0,1,2,3,4,5,6,7,8])).map(p => p[1]-1); // How many fish at each of timer values 0-8 (just use index for age)
    const countIter = (counts: number[]) : number[] => {
        return [
            counts[1], // new 0 - there are the same number of 0s as 1s in the previous round - they all just reduced by 1. etc...
            counts[2],
            counts[3],
            counts[4],
            counts[5],
            counts[6],
            counts[7] + counts[0], // new 6 - all the 7s plus all the 0s resetting to 6
            counts[8],
            counts[0] // new 8 - 1 for each 0 which reset
        ]
    };
    for (let day: number = 0; day < 256; day++) {
        school = school = countIter(school);
    }
    console.log("Stage 2: " + _.sum(school));
}
