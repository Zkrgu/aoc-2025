import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").slice(0, -1);

const junctions = input.split('\n').map(e => e.split(',')).sort();

const distance = [];
for (let a = 0; a < junctions.length - 1; ++a) {
    for (let b = a + 1; b < junctions.length; ++b) {
        const jA = junctions[a];
        const jB = junctions[b];
        const dist = Math.pow(jA[0] - jB[0], 2) + Math.pow(jA[1] - jB[1], 2) + Math.pow(jA[2] - jB[2], 2);

        distance.push([dist, a, b])
    }
}

distance.sort(([a], [b]) => a - b);

const link = junctions.map((_, i) => i)
function find(x) {
    if (x == link[x]) {
        return x;
    }
    link[x] = find(link[x])
    return link[x];
}
function unite(x, y) {
    link[x] = find(y);
}

let connections = 0;
for (const [i, [dist, jA, jB]] of distance.entries()) {
    if (i === 1000) {
        const size = new Map();
        for (let k = 0; k < junctions.length; ++k) {
            const key = find(k)
            size.set(key, (size.get(key) ?? 0) + 1)
        }
        console.log([...size.values()].sort((a, b) => b - a).slice(0, 3).reduce((p, c) => p * c, 1))
    }
    if (find(jA) != find(jB)) {
        connections += 1;
        if (connections == junctions.length - 1) {
            console.log(junctions[jA][0] * junctions[jB][0])
        }
        unite(jA, jB)
    }
}
