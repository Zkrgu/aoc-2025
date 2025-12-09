import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").slice(0, -1);

const coords = input.split('\n').map(e => e.split(',').map(e => +e))

let part1 = 0;
let sq = 0;
for (let i = 0; i < coords.length - 1; ++i) {
    for (let j = i; j < coords.length; ++j) {
        const size = (Math.abs(coords[i][0] - coords[j][0]) + 1) * (Math.abs(coords[i][1] - coords[j][1]) + 1)
        if (size > part1) part1 = size;
    }
}

console.log(part1)

const allNums = [...new Set(coords.flat())].sort((a, b) => a - b)

allNums.unshift(allNums[0] - 1)
allNums.push(allNums.at(-1) + 1)

const cCoords = coords.map(e => e.map(f => allNums.indexOf(f)));

const green = new Set();

let prev = cCoords.at(-1)
for (let i = 0; i < cCoords.length; ++i) {
    if (cCoords[i][0] == prev[0]) {
        for (let j = Math.min(cCoords[i][1], prev[1]); j <= Math.max(cCoords[i][1], prev[1]); ++j) {
            green.add(`${cCoords[i][0]},${j}`)
        }
    }
    else if (cCoords[i][1] == prev[1]) {
        for (let j = Math.min(cCoords[i][0], prev[0]); j <= Math.max(cCoords[i][0], prev[0]); ++j) {
            green.add(`${j},${cCoords[i][1]}`)
        }
    }
    prev = cCoords[i];
}

const grid = new Array(allNums.length).fill(0).map(e => new Array(allNums.length).fill(0).map(f => ' '))

for (const test of green.keys()) {
    const [x, y] = test.split(',')
    grid[y][x] = "#"
}


const queue = [[0, 0]];
// for (let i = 0; i < 10; ++i) {
while (queue.length > 0) {
    const node = queue.shift()
    const [x, y] = node;
    if (grid[y][x] != " ") continue;
    grid[y][x] = "."

    queue.push(...getNeigh(x, y))
}

function getNeigh(x, y) {
    const n = [];
    for (const [dx, dy] of [[-1, 0], [0, -1], [0, 1], [1, 0]]) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= allNums.length) continue;
        if (ny < 0 || ny >= allNums.length) continue;
        n.push([nx, ny])
    }
    return n;
}

// console.log(grid.map(e => e.join('')).join('\n'))

let part2 = 0;
for (let i = 0; i < cCoords.length - 1; ++i) {
    for (let j = i + 1; j < cCoords.length; ++j) {
        const lx = Math.min(cCoords[i][0], cCoords[j][0])
        const hx = Math.max(cCoords[i][0], cCoords[j][0])
        const ly = Math.min(cCoords[i][1], cCoords[j][1])
        const hy = Math.max(cCoords[i][1], cCoords[j][1])

        const size = (Math.abs(allNums[cCoords[i][0]] - allNums[cCoords[j][0]]) + 1) * (Math.abs(allNums[cCoords[i][1]] - allNums[cCoords[j][1]]) + 1)
        let ok = true;

        if (size > part2) {
            for (let k = lx; k <= hx; ++k) {
                if (!isInside(k, cCoords[i][1]) || !isInside(k, cCoords[j][1])) {
                    // console.log(k, cCoords[i], cCoords[j])
                    ok = false;
                    break
                }
            }
            if (!ok) continue;
            for (let k = ly; k <= hy; ++k) {
                if (!isInside(cCoords[i][0], k) || !isInside(cCoords[j][0], k)) {
                    ok = false;
                    break
                }
            }
            if (ok) {
                // console.log(cCoords[i].map(e => allNums[e]), cCoords[j].map(e => allNums[e]))
                part2 = size;
            }
        }
    }
}

console.log(part2)

function isInside(x, y) {
    return grid[y][x] != "."
}
