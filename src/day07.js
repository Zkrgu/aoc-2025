import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").slice(0, -1);

const grid = input.split('\n').map(e => e.split(''));

const width = grid[0].length;
const height = grid.length;

const start = grid[0].findIndex(s => s == "S");

let currentRow = new Map();
currentRow.set(start, 1)

let part1 = 0;
for (const row of grid) {
    let nextRow = new Map();
    for (const [x, c] of currentRow.entries()) {
        if (x < 0 || x >= width) continue;
        if (row[x] == "^") {
            nextRow.set(x - 1, (nextRow.get(x - 1) ?? 0) + c)
            nextRow.set(x + 1, (nextRow.get(x + 1) ?? 0) + c)
            ++part1;
        } else {
            nextRow.set(x, (nextRow.get(x) ?? 0) + c)
        }
    }
    currentRow = nextRow
}
const part2 = [...currentRow.values()].reduce((p, c) => p + c)

console.log(part1)
console.log(part2)
