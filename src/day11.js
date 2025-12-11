import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").slice(0, -1);

const lines = input.split('\n');

const adjacent = new Map();

for (const line of lines) {
    const [start, rest] = line.split(': ');
    const connected = rest.split(' ');

    adjacent.set(start, connected);
}

const DP = new Map();
function dfs(node, end, fft = false, dac = false) {
    if (node == end) {
        return fft && dac;
    }
    const key = toKey(node, fft, dac);
    if (DP.has(key)) return DP.get(key);
    const neighs = adjacent.get(node);

    let sum = 0;
    for (const neigh of neighs) {
        sum += dfs(neigh, end, fft || node == "fft", dac || node == "dac");
    }

    DP.set(key, sum);
    return sum;
}


function toKey(...a) {
    return a.join(',');
}

console.log(dfs("you", "out", true, true));
console.log(dfs("svr", "out"));
