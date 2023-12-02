const fs = require("fs");
/** DAY 1 */

const input = fs.readFileSync(`${__dirname}/1.txt`, "utf-8");

const numbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const toInt = (str) => numbers[str] ?? str;

const calibrate = (line) => {
  const matched = Array.from(
    line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g),
    (match) => match[1]
  );
  return [toInt(matched[0]), toInt(matched.slice(-1))];
};

const calculate = ([head, ...tail], total = 0) => {
  if (!head) return total;
  const [first, last] = calibrate(head);
  return calculate(tail, total + parseInt(`${first}${last}`, 10));
};

test.each([
  [
    `two1nine
	eightwothree
	abcone2threexyz
	xtwone3four
	4nineeightseven2
	zoneight234
	7pqrstsixteen`,
    281,
  ],
  ["eightthree", 83],
  [input, 54208],
])("Day 1", (x, expected) => {
  expect(toInt("one")).toBe("1");
  expect(toInt("two")).toBe("2");
  expect(toInt("three")).toBe("3");
  expect(toInt("four")).toBe("4");
  expect(toInt("five")).toBe("5");
  expect(toInt("six")).toBe("6");
  expect(toInt("seven")).toBe("7");
  expect(toInt("eight")).toBe("8");
  expect(toInt("nine")).toBe("9");
  expect(calculate(x.split("\n"))).toBe(expected);
});
