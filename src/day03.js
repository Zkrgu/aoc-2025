import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").trim();

const banks = input.trim().split('\n')

let part1 = 0;
let part2 = 0;

for (const bank of banks) {
    const voltages = bank.split('').map(e => +e);

    let num = 0;
    let lastIndex = -1;
    for (let i = 0; i < 2; ++i) {
        const highest = Math.max(...voltages.slice(lastIndex + 1, (-1 + i || undefined)));
        const first = voltages.indexOf(highest, lastIndex + 1);

        num *= 10
        num += highest
        lastIndex = first
    }
    part1 += num;
    num = 0
    lastIndex = -1;
    for (let i = 0; i < 12; ++i) {
        const highest = Math.max(...voltages.slice(lastIndex + 1, (-11 + i || undefined)));
        const first = voltages.indexOf(highest, lastIndex + 1);

        num *= 10
        num += highest
        lastIndex = first
    }
    part2 += num
}

console.log(part1)
console.log(part2)
