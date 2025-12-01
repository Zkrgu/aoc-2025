import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").trim();

const lines = input.trim().split('\n');

const max = 100;
let num = 50;

let part1 = 0;
let part2 = 0;

for (const line of lines) {
    const dir = line[0] == 'L' ? -1 : 1;
    const thisNum = +line.slice(1)

    const oldNum = num;
    num = num + (thisNum % 100) * dir;

    if (thisNum > 99) part2 += Math.floor(thisNum / 100)
    if (oldNum != 0 && num < 0 || num > max) ++part2;

    num = ((num % max) + max) % max
    if (num == 0) ++part1
}
part2 += part1

console.log(part1);
console.log(part2);
