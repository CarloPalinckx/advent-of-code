const fs = require("fs");
const input = fs.readFileSync(`${__dirname}/2.txt`, "utf-8");

const orderMap = ["red", "green", "blue"];

function* dissect(line) {
  const [gameId, games] = line.split(": ");
  yield parseInt(gameId.split(" ")[1], 10);
  yield games.split("; ").map((game) => {
    const stats = [0, 0, 0];
    game.split(", ").forEach((x) => {
      const [value, key] = x.split(" ");
      stats[orderMap.indexOf(key)] = parseInt(value, 10);
    });

    return stats;
  });
}

const highestByColor = ([head, ...tail], highest = [0, 0, 0]) => {
  if (!head) return highest;

  return highestByColor(tail, [
    head[0] > highest[0] ? head[0] : highest[0],
    head[1] > highest[1] ? head[1] : highest[1],
    head[2] > highest[2] ? head[2] : highest[2],
  ]);
};

const count = ([head, ...tail], config, sum = 0) => {
  if (!head) return sum;

  return count(
    tail,
    config,
    sum + highestByColor(head[1]).reduce((power, cube) => power * cube, 1)
  );
};

test.each([
  [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    { red: 12, green: 13, blue: 14 },
    48,
  ],
  [
    `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
	Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
	Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
	Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
	Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
    { red: 12, green: 13, blue: 14 },
    2286,
  ],
  [input, { red: 12, green: 13, blue: 14 }, 66681],
])("Day 2", (x, config, expected) => {
  expect(
    count(
      x.split("\n").map((y) => Array.from(dissect(y))),
      config
    )
  ).toBe(expected);
});
