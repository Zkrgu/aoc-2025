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
function dfs(node, end) {
    if (node == end) {
        return 1;
    }
    const key = toKey(node, end)
    if (DP.has(key)) return DP.get(key);
    const neighs = adjacent.get(node) ?? [];

    let sum = 0;
    for (const neigh of neighs) {
        sum += dfs(neigh, end);
    }

    DP.set(key, sum);
    return sum;
}

function toKey(...a) {
    return a.join(',')
}

console.log(dfs("you", "out", true, true));
const svrToFft = dfs("svr", "fft");
const fftToDac = dfs("fft", "dac");
const dacToOut = dfs("dac", "out");
const svrToDac = dfs("svr", "dac");
const dacToFft = dfs("dac", "fft");
const fftToOut = dfs("fft", "out");

console.log(svrToFft * fftToDac * dacToOut + svrToDac * dacToFft * fftToOut);
