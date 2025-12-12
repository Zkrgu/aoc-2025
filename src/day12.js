import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").slice(0, -1);

const lists = input.split('\n\n');

const shapeList = lists.slice(0, -1);
const regions = lists.at(-1).split('\n');

const shapes = [];

for (const shape of shapeList) {
    const lines = shape.split('\n')
    const index = lines[0].split('').slice(0, -1).join('');
    const grid = lines.slice(1).map(e => e.split('').map(f => f == "#" ? 1 : 0))
    shapes.push(grid)
}

const shapeCosts = shapes.map(e => e.flat().reduce((p, c) => p + c))

let part1 = 0;

for (const region of regions) {
    const spl = region.split(': ');
    const [sizeX, sizeY] = spl[0].split('x').map(e => +e);
    const shapeCounts = spl[1].split(' ').map(e => +e);

    const regionCost = shapeCounts.map((e, i) => e * shapeCosts[i]).reduce((p, c) => p + c);
    if (sizeX * sizeY < regionCost) continue;

    // Check actual shapes here

    part1 += 1;
}

console.log(part1);
