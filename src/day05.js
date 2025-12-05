import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").trim();

const [first, lines] = input.trim().split('\n\n').map(e => e.split('\n'))

const ranges = first.map(e => e.split('-').map(f => +f)).sort(([a], [b]) => a - b);

const fresh = [];

for (let [i, [start, end]] of ranges.entries()) {
    if (fresh.at(-1)?.[1] >= end) continue;
    for (let j = i; j < ranges.length; ++j) {
        if (ranges[j][0] <= end) {
            end = Math.max(end, ranges[j][1])
        }
    }
    fresh.push([start, end])
}

let part1 = 0;
for (const line of lines) {
    const num = +line

    for (const [start, end] of fresh) {
        if (num >= start && num <= end) {
            part1++
            break;
        }
    }

}

let part2 = 0
for (const range of fresh) {
    part2 += range[1] - range[0] + 1
}

console.log(part1)
console.log(part2)
