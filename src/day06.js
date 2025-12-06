import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").slice(0, -1);

const lines = input.split('\n')

const p1lines = lines.map(e => e.trim().split(/\s+/g));

const math = new Array(p1lines[0].length).fill(0).map(e => []);

for (const row of p1lines) {
    for (const [i, column] of row.entries()) {
        math[i].push(column);
    }
}

let part1 = 0;
for (const expr of math) {
    const method = expr.at(-1);
    if (method == "+") {
        part1 += expr.slice(0, -1).reduce((p, c) => p - -c)
    }
    if (method == "*") {
        part1 += expr.slice(0, -1).map(e => +e).reduce((p, c) => p * c)
    }
}

console.log(part1);

let part2 = 0;
let method;
let psum = 0;
let buf;
for (let x = 0; x < lines[0].length; ++x) {
    buf = "";
    for (let y = 0; y < lines.length; ++y) {
        const char = lines[y][x];
        if (char == "*" || char == "+") {
            method = char;
        } else if (char != " " && char != undefined) {
            buf += char;
        }
    }
    if (buf.trim() == "") {
        part2 += psum;
        psum = 0;
    }
    else if (method == "+") psum += +buf;
    else if (method == "*") {
        if (psum == 0) psum = 1;
        psum *= +buf;
    }
}
part2 += psum

console.log(part2)
