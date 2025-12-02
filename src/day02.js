import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").trim();

const idRanges = input.trim().split(',')

let part1 = 0;
let part2 = 0;

for (const range of idRanges) {
    const [start, end] = range.split('-').map(e => +e);

    for (let i = start; i <= end; ++i) {
        const str = "" + i
        if (/^(\d+)\1$/.test(str)) part1 += i;
        if (/^(\d+)\1+$/.test(str)) part2 += i;
    }
}

console.log(part1)
console.log(part2)
