import * as _ from 'lodash';
import {readFileSync} from 'fs';

//const filename = './Day4Sample.txt';
const filename = './Day4Data.txt';
const data: string[] = readFileSync(filename, 'ascii').split(/\r\n/);
const calls: number[] = data[0].split(',').map(s => parseInt(s));
const boardData = _.chunk(data.slice(2), 6);

interface item {
    value: number;
    drawn: boolean;
}
interface row {
    items: item[]
}
interface board {
    rows: row[];
    hasWon: boolean;
}

const boards = boardData.map((boardValues): board => {
    return {
        hasWon: false,
        rows: boardValues.slice(0, 5).map(rowString => {
            return ({
                items: rowString.trim().split(/\s+/)
                    .map(s => ({value: parseInt(s), drawn: false}))
            });
        })
    }
});

const markBoard = (board: board, drawn: number) => {
    for (let row of board.rows) {
        for (let item of row.items) {
            if (item.value == drawn)
                item.drawn = true;
        }
    }
}

const hasWon = (board: board) => {
    for (let row of board.rows) {
        if (row.items.every(i => i.drawn)) return true;
    }
    for (let col of [0,1,2,3,4]) {
        if (board.rows.every(r => r.items[col].drawn)) return true;
    }
    return false;
}

const scoreBoard = (board: board, drawn: number) => {
    const sumUnmarked = _.sum(board.rows.map(r => _.sumBy(r.items, i => i.drawn ? 0 : i.value)));
    return sumUnmarked * drawn;
}

let winners = 0;
for (let drawn of calls) {
    for (let board of boards.filter(b => !b.hasWon)) {            
        markBoard(board, drawn);
        if (hasWon(board)) {
            board.hasWon = true;
            winners += 1;
            if (winners == 1)
                console.log("First winner! Score is " + scoreBoard(board, drawn));
            if (winners == boards.length)
                console.log('Last "winner"! Score is ' + scoreBoard(board, drawn));
        }
    }
}
