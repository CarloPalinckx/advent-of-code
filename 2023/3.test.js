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
    467835,
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
        map.set(toKey(x, y), cell);
      }
    })
  );

  const entries = map.entries();
  const gears = Array.from(entries).filter((entry) => {
    return entry[1] === "*";
  });

  /**
   * [-1,-1], [ 0,-1], [ 1,-1]
   * [-1, 0], [ 0, 0], [ 1, 0]
   * [-1, 1], [ 0, 1], [ 1, 1]
   */

  const getAdjacentDigits = (coords) => {
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

    return adjacent.filter((key) => {
      const value = map.get(key);

      return !isNaN(parseInt(value, 10));
    });
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

  let sum = 0;

  gears.forEach((gear) => {
    const adjacentDigits = getAdjacentDigits(gear[0]);
    const adjacents = new Set();

    adjacentDigits.forEach((digit) => {
      const [prev, leftBoundary] = findPrevious(toCoords(digit));
      const [next, rightBoundary] = findNext(toCoords(digit));

      adjacents.add(
        `${prev}${map.get(digit)}${next}:${leftBoundary}-${rightBoundary}`
      );
    });

    if (adjacents.size === 2) {
      const iterator = adjacents[Symbol.iterator]();
      sum +=
        iterator.next().value.split(":")[0] *
        iterator.next().value.split(":")[0];
    }
  });

  expect(sum).toBe(expected);
});
