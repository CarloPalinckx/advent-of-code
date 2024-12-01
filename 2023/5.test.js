const fs = require("fs");
const input = fs.readFileSync(`${__dirname}/5.txt`, "utf-8");

test.each([
  [
    `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
    35,
  ],
  // [input, 9236992],
])("Day 5", (input, expected) => {
  const [seeds, ...maps] = input.split("\n\n").map((x) => x.split("\n"));
  const from = {};

  maps.forEach((map) => {
    const [header, ...lines] = map;
    const [key, to] = header.replace(" map:", "").split("-to-");
    from[key] = { to, lines: lines.map((line) => line.split(" ")) };
  });

  const find = (key, line) => {
    if (!from[from[key].to]) {
      return from[key].lines;
    }

    return find(from[key].to);
  };

  console.log(JSON.stringify(from, null, 2));

  console.log(find("seed"));

  expect(total).toBe(expected);
});
