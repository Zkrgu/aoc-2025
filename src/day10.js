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
        for (const val of x) {
            model["variables"][`button${i}`][`jolt${val}`] = 1;
        }
    }

    const variables = new Array(joltage.length).fill(0).map(e => new Array(buttons.length).fill(0));
    for (const [i, button] of buttons.entries()) {
        for (const x of button) {
            variables[x][i] = 1;
        }
    }

    // console.log(variables);
    solve2(variables, joltage)

    console.log(solver.ReformatLP(model));
    // console.log(solver.Solve(model))
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

function solve2(variables, constraints) {
    // The goal joltage for the rows below
    // const constraints = [3, 5, 4, 7]
    //
    // // Every column is a button
    // // Every row is a joltage
    // const variables = [
    //     [0, 0, 0, 0, 1, 1],
    //     [0, 1, 0, 0, 0, 1],
    //     [0, 0, 1, 1, 1, 0],
    //     [1, 1, 0, 1, 0, 0],
    // ]

    // All buttons cost the same
    const objective = new Array(variables.length).fill(-1);
    objective.push(0);
    //[-1, -1, -1, -1, -1, -1, 0]

    const tableu = variables.map((e, i) => [...e, constraints[i]])
    // tableu.push([...objective, 0])

    console.log(tableu, objective);

    while (objective.slice(0, -1).find(e => e < 0)) {
        const pivotColIdx = objective.reduce((p, c, i) => c < p[0] ? [c, i] : p, [0, -1])[1];
        const pivotRowIdx = tableu.reduce((p, c, i) => {
            const ratio = c[c.length - 1] / c[pivotColIdx]
            if (ratio > 0 && ratio < p[0]) return [ratio, i]
            return p
        }, [Infinity, -1])[1]

        // Pivot
        const pivotValue = tableu[pivotRowIdx][pivotColIdx];
        tableu[pivotRowIdx] = tableu[pivotRowIdx].map(e => e / pivotValue)
        for (const [i, row] of tableu.entries()) {
            if (i == pivotRowIdx) continue;
            const mul = row[pivotColIdx];

            tableu[i] = row.map((e, j) => e - mul * tableu[pivotRowIdx][j]);
        }
        const mul = objective[pivotColIdx];
        for (const [i, obj] of objective.entries()) {
            objective[i] = obj - mul * tableu[pivotRowIdx][i];
        }
    }
    console.log(tableu, objective)
}
