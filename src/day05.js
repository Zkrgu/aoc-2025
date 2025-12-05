import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").trim();

const [first, lines] = input.trim().split('\n\n').map(e => e.split('\n'))

const ranges = first.map(e => e.split('-').map(f => +f)).sort(([a], [b]) => a - b);

const fresh = [];

for (let [start, end] of ranges) {
    const lastEnd = fresh.at(-1)?.[1]
    if (lastEnd >= start) fresh.at(-1)[1] = Math.max(end, lastEnd);
    else fresh.push([start, end])
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
