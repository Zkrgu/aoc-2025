import { readFileSync } from "node:fs";

const input = readFileSync(process.stdin.fd, "utf-8").trim();

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

const indices = lines.at(-1).split('').map((e, i) => e != " " ? i : null).filter((e) => e != null)

const cols = new Array(indices.length).fill(0).map(e => []);

for (const row of lines) {
    let lastIndex = 0;
    for (const [i, index] of indices.slice(1).entries()) {
        cols[i].push(row.slice(lastIndex, index - 1))
        lastIndex = index;
    }
    cols[cols.length - 1].push(row.slice(lastIndex))
}

let part2 = 0;

for (const expr of cols) {
    if (expr.length == 0) continue
    const withoutOp = expr.slice(0, -1)
    const method = expr.at(-1).trim()
    const nums = [];
    for (let i = 0; i < expr[0].length; ++i) {
        let num = ""
        for (const row of withoutOp) {
            num += row[i]
        }
        nums.push(+num)
    }
    let score = 0;
    if (method == "+") {
        score = nums.reduce((p, c) => p - -c)
    }
    if (method == "*") {
        score = nums.reduce((p, c) => p * c)
    }
    part2 += score
}

console.log(part2)
