const fs = require("fs");
const input = fs.readFileSync(`${__dirname}/4.txt`, "utf-8");

test.each([
  [
    `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
    13,
  ],
  [input, 556057],
])("Day 3", (input, expected) => {
  // [
  // 	[ '41 48 83 86 17 ', ' 83 86  6 31 17  9 48 53' ],
  // 	[ '13 32 20 16 61 ', ' 61 30 68 82 17 32 24 19' ],
  // 	[ ' 1 21 53 59 44 ', ' 69 82 63 72 16 21 14  1' ],
  // 	[ '41 92 73 84 69 ', ' 59 84 76 51 58  5 54 83' ],
  // 	[ '87 83 26 28 32 ', ' 88 30 70 12 93 22 82 36' ],
  // 	[ '31 18 13 56 72 ', ' 74 77 10 23 35 67 36 11' ]
  //   ]

  const games = input
    .replace(/\s\s+/g, " ")
    .split("\n")
    .map((line) => {
      return line
        .split(": ")[1]
        .split(" | ")
        .map((game) => game.split(" "));
    });

  const total = games.reduce((total, [left, right]) => {
    const gamePoints = right.reduce((points, number) => {
      if (left.includes(number)) {
        return points === 0 ? 1 : points * 2;
      }

      return points;
    }, 0);

    return total + gamePoints;
  }, 0);

  expect(total).toBe(expected);
});
