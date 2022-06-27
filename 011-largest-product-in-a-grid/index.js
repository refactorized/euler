const fs = require('fs');

const gridStr=fs.readFileSync('./grid.txt', 'utf-8');

// single flat array - could do a matrix of rows x cols too
const data = gridStr.split('\n').flatMap(row => row.split(' ')).map(str => parseInt(str));

// access linear array as if it were a matrix 20x20 - this could be generalized of course
const get = (x, y) => data[x*20+y]

// horizontal (top)
const hprod = (x, y) => get(x+0,y+0) * get(x+1, y+0) * get(x+2, y+0) * get(x+3, y+0);
// vertical (left)
const vprod = (x, y) => get(x+0,y+0) * get(x+0, y+1) * get(x+0, y+2) * get(x+0, y+3);
// diagonal +x => +y, down and to the right in matrix layout
const dprod = (x, y) => get(x+0,y+0) * get(x+1, y+1) * get(x+2, y+2) * get(x+3, y+3);
// inverse  +x => -y, up and to the right in matrix layout
const iprod = (x, y) => get(x+0,y+3) * get(x+1, y+2) * get(x+2, y+1) * get(x+3, y+0);

const localMax = (x, y) => Math.max(hprod(x,y), vprod(x,y), dprod(x,y), iprod(x,y))

let globalMax = 20;

for(let x = 0; x<17; x++) {
    for(let y = 0; y<17; y++) {
        globalMax = Math.max(globalMax, localMax(x,y))
    }
}

console.log(globalMax)