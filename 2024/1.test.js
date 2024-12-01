const fs = require("fs");
const input = fs.readFileSync(`${__dirname}/1.txt`, "utf-8");

const example = `3   4
4   3
2   5
1   3
3   9
3   3`;

test.each([
  [example, 11],
  [input, 19051889],
])("Day 1", (input, expected) => {
  const lines = input.split("\n");
  const lArr = [];
  const rArr = [];

  const ints = lines.map((line) => {
    return line.split("   ").map((n) => parseInt(n, 10));
  });

  ints.forEach(([x, y]) => {
    lArr.push(x);
    rArr.push(y);
  });

  let total = 0;
  const l = [...lArr].sort();
  const r = [...rArr].sort();

  for (let i = 0; i < Math.max(l.length, r.length); i++) {
    let diff = 0;

    if (!r[i]) {
      diff = l[i] - r[r.length - 1];
    } else if (!l[i]) {
      diff = r[i] - l[l.length - 1];
    } else {
      diff = r[i] - l[i];
    }

    total += Math.abs(diff);
  }

  expect(total).toBe(expected);
});
