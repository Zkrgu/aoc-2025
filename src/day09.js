import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").slice(0, -1);

const coords = input.split('\n').map(e => e.split(',').map(e => +e))

const allNums = [...new Set(coords.flat())].sort((a, b) => a - b)

allNums.unshift(allNums[0] - 1)
allNums.push(allNums.at(-1) + 1)

function toCompact(n) {
    return allNums.indexOf(n);
}

const cCoords = coords.map(e => e.map(f => toCompact(f)));

const sizes = [];
for (let i = 0; i < coords.length - 1; ++i) {
    for (let j = i + 1; j < coords.length; ++j) {
        sizes.push([(Math.abs(coords[i][0] - coords[j][0]) + 1) * (Math.abs(coords[i][1] - coords[j][1]) + 1), cCoords[i], cCoords[j]])
    }
}

sizes.sort(([a], [b]) => b - a);

console.log(sizes[0][0])


const grid = new Array(allNums.length).fill(0).map(e => new Array(allNums.length).fill(' '))

let prev = cCoords.at(-1)
for (let i = 0; i < cCoords.length; ++i) {
    if (cCoords[i][0] == prev[0]) {
        for (let j = Math.min(cCoords[i][1], prev[1]); j <= Math.max(cCoords[i][1], prev[1]); ++j) {
            grid[j][cCoords[i][0]] = "#";
        }
    }
    else if (cCoords[i][1] == prev[1]) {
        for (let j = Math.min(cCoords[i][0], prev[0]); j <= Math.max(cCoords[i][0], prev[0]); ++j) {
            grid[cCoords[i][1]][j] = "#";
        }
    }
    prev = cCoords[i];
}

const queue = [[0, 0]];
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

for (const [size, p1, p2] of sizes) {
    const lx = Math.min(p1[0], p2[0])
    const hx = Math.max(p1[0], p2[0])
    const ly = Math.min(p1[1], p2[1])
    const hy = Math.max(p1[1], p2[1])

    let ok = true;
    for (let k = lx; k <= hx; ++k) {
        if (!isInside(k, p1[1]) || !isInside(k, p2[1])) {
            ok = false;
            break
        }
    }
    if (!ok) continue;
    for (let k = ly; k <= hy; ++k) {
        if (!isInside(p1[0], k) || !isInside(p2[0], k)) {
            ok = false;
            break
        }
    }
    if (ok) {
        console.log(size)
        break;
    }
}


function isInside(x, y) {
    return grid[y][x] != "."
}
