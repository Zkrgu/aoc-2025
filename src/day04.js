import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").trim();

const lines = input.trim().split('\n');

const grid = lines.map(e => e.split(''));

let part1 = 0;
for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
        if (grid[y][x] != "@") continue;
        let sum = 0;
        for (const [nx, ny] of getNeighbours(x, y)) {
            if (grid[ny][nx] == "@") ++sum;
        }
        if (sum < 4) {
            ++part1;
        }
    }
}

console.log(part1)

let part2 = 0;
let prev = true;
while (prev) {
    prev = false;
    for (let y = 0; y < grid.length; ++y) {
        for (let x = 0; x < grid[y].length; ++x) {
            if (grid[y][x] != "@") continue;
            let sum = 0;
            for (const [nx, ny] of getNeighbours(x, y)) {
                if (grid[ny][nx] == "@") ++sum;
            }
            if (sum < 4) {
                ++part2;
                prev = true;
                grid[y][x] = "."
            }
        }
    }
}
console.log(part2)

function getNeighbours(x, y) {
    const n = [];
    for (const dx of [-1, 0, 1]) {
        for (const dy of [-1, 0, 1]) {
            if (dx == 0 && dy == 0) continue;
            const nx = x + dx;
            if (nx < 0 || nx >= grid[0].length) continue
            const ny = y + dy;
            if (ny < 0 || ny >= grid.length) continue
            n.push([nx, ny])
        }
    }
    return n
}
