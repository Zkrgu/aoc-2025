import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").slice(0, -1);

const junctions = input.split('\n').map(e => e.split(',')).sort();

const connectedTo = new Map();

const REAL = 1000;

const distance = [];
for (let a = 0; a < junctions.length - 1; ++a) {
    for (let b = a + 1; b < junctions.length; ++b) {
        const jA = junctions[a];
        const jB = junctions[b];
        const dist = Math.pow(jA[0] - jB[0], 2) + Math.pow(jA[1] - jB[1], 2) + Math.pow(jA[2] - jB[2], 2);

        distance.push([dist, jA, jB])
    }
}
distance.sort(([a], [b]) => a - b)
for (let i = 0; i < distance.length - 1; ++i) {
    if (i == REAL) {
        const sizes = getSizes()
        const part1 = sizes.sort((a, b) => b - a).slice(0, 3).reduce((p, c) => p * (c || 1), 1)
        console.log(part1);
    }
    const key1 = distance[i][1].join(',')
    const key2 = distance[i][2].join(',')
    connectedTo.set(key1, (connectedTo.get(key1) ?? []).concat(key2))
    connectedTo.set(key2, (connectedTo.get(key2) ?? []).concat(key1))
    if (i >= REAL) {
        const sizes = getSizes();
        const nonZero = sizes.filter(e => e != 0)
        if (nonZero.length == 1 && nonZero.reduce((p, c) => p + c) == junctions.length) {
            console.log(distance[i][1][0] * distance[i][2][0])
            break;
        }
    }
}
// console.log(JSON.stringify(distance, undefined, '\t'))

function getSizes() {
    const visited = new Set();
    const sizes = [];

    for (const [node, connection] of connectedTo.entries()) {
        const queue = [node];
        let size = 0;
        while (queue.length > 0) {
            const node = queue.pop();
            if (visited.has(node)) continue;
            visited.add(node);
            size += 1;
            queue.push(...(connectedTo.get(node) ?? []))
        }
        sizes.push(size);
    }
    return sizes;
}
