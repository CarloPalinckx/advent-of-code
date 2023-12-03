const fs = require("fs");
const input = fs.readFileSync(`${__dirname}/3.txt`, "utf-8");

test.each([
  [
    `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
    4361,
  ],
  [input, 556057],
])("Day 3", (input, expected) => {
  const map = new Map();
  const found = new Set();
  const toKey = (x, y) => `${x}-${y}`;
  const toCoords = (coords) => coords.split("-").map((x) => parseInt(x, 10));

  input.split("\n").forEach((row, y) =>
    row.split("").forEach((cell, x) => {
      if (cell !== ".") {
        map.set(toKey(x, y), cell.replace(/[^0-9]/, "*"));
      }
    })
  );

  const entries = map.entries();
  const digits = Array.from(entries).filter((entry) => {
    return entry[1] !== "*";
  });

  /**
   * [-1,-1], [ 0,-1], [ 1,-1]
   * [-1, 0], [ 0, 0], [ 1, 0]
   * [-1, 1], [ 0, 1], [ 1, 1]
   */

  const hasAdjacentSymbol = (coords) => {
    const [x, y] = toCoords(coords);

    const adjacent = [
      toKey(x - 1, y - 1),
      toKey(x, y - 1),
      toKey(x + 1, y - 1),
      toKey(x - 1, y),
      toKey(x + 1, y),
      toKey(x - 1, y + 1),
      toKey(x, y + 1),
      toKey(x + 1, y + 1),
    ];

    return (
      adjacent.filter((key) => {
        const value = map.get(key);
        return value === "*";
      }).length > 0
    );
  };

  const findPrevious = ([x, y], total = "") => {
    const prev = map.get(toKey(x - 1, y));
    if (isNaN(parseInt(prev, 10))) return [total, [x, y]];
    return findPrevious([x - 1, y], `${prev}${total}`);
  };

  const findNext = ([x, y], total = "") => {
    const next = map.get(toKey(x + 1, y));
    if (isNaN(parseInt(next, 10))) return [total, [x, y]];

    return findNext([x + 1, y], `${total}${next}`);
  };

  digits.forEach((digit) => {
    if (hasAdjacentSymbol(digit[0])) {
      const [prev, leftBoundary] = findPrevious(toCoords(digit[0]));
      const [next, rightBoundary] = findNext(toCoords(digit[0]));

      found.add(
        `${prev}${map.get(digit[0])}${next}:${leftBoundary}-${rightBoundary}`
      );
    }
  });
  console.log(found);
  const sum = Array.from(found).reduce(
    (sum, digit) => sum + parseInt(digit, 10),
    0
  );

  expect(sum).toBe(expected);
});
