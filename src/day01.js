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

    let oldNum = num;
    num += thisNum * (dir)
    // if (num >= max || num < 0) ++part2;
    // if (thisNum > 99) part2 += Math.floor(thisNum / 100) - 1;
    // console.log(((num % max) + max) % max)
    // num = ((num % max) + max) % max
    let first = true;
    while (num >= max || num < 0) {
        if (first && oldNum == 0 && num <= 0) {
            --part2;
        }
        first = false;
        if (num == max) {
            num = 0
            break;
        }
        ++part2;
        // console.log(num)
        if (num >= max) num -= max;
        else num += max;
    }
    if (num == 0) {
        ++part1;
        ++part2
    }
    console.log(num)
}

console.log(part1);
console.log(part2);
