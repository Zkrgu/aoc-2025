import { readFileSync } from "node:fs";
import solver from 'javascript-lp-solver';

const input = readFileSync(process.stdin.fd, "utf-8").slice(0, -1);

const lines = input.split('\n');

let part1 = 0;
let part2 = 0;
for (const line of lines) {
    const goal = line.match(/\[(.*)\]/)[1];
    const buttons = [...line.matchAll(/\(([\d,]+)\)/g)].map(e => e[1].split(',').map(f => +f));
    const joltage = line.match(/{(.*)}/)[1].split(',').map(f => +f);

    const initial = new Array(goal.length).fill('.').join('');

    const queue = [[initial, goal, buttons, 0]];

    const seen = new Set();

    while (queue.length > 0) {
        const [initial, goal, buttons, presses] = queue.shift();
        if (seen.has(initial)) continue;
        seen.add(initial);
        if (initial == goal) {
            part1 += presses;
            break;
        }
        for (const method of buttons) {
            queue.push([applyButtons(initial, method), goal, buttons, presses + 1])
        }
    }

    const model = {
        "optimize": "cost",
        "opType": "min",
        "constraints": {
        },
        "variables": {
        },
        "ints": {},
    }

    for (const [i, jolt] of joltage.entries()) {
        model["constraints"][`jolt${i}`] = { "equal": jolt };
    }

    for (const [i, x] of buttons.entries()) {
        model["variables"][`button${i}`] = { "cost": 1 };
        model["ints"][`button${i}`] = 1;
        for (const j of joltage.keys()) {
            model["variables"][`button${i}`][`jolt${j}`] = 0;
        }
        for (const val of x) {
            model["variables"][`button${i}`][`jolt${val}`] = 1;
        }
    }

    part2 += solver.Solve(model).result
}

function applyButtons(initial, button) {
    const out = initial.split('')
    for (const light of button) {
        out[light] = out[light] == '.' ? '#' : '.';
    }
    return out.join('');
}

console.log(part1);
console.log(part2);
