const fs = require("fs");
const input = fs.readFileSync("5.txt", "utf-8");

// [N]     [Q]         [N]
// [R]     [F] [Q]     [G] [M]
// [J]     [Z] [T]     [R] [H] [J]
// [T] [H] [G] [R]     [B] [N] [T]
// [Z] [J] [J] [G] [F] [Z] [S] [M]
// [B] [N] [N] [N] [Q] [W] [L] [Q] [S]
// [D] [S] [R] [V] [T] [C] [C] [N] [G]
// [F] [R] [C] [F] [L] [Q] [F] [D] [P]
//  1   2   3   4   5   6   7   8   9

const crates = [
  ["F", "D", "B", "Z", "T", "J", "R", "N"],
  ["R", "S", "N", "J", "H"],
  ["C", "R", "N", "J", "G", "R", "T", "Q"],
  ["F", "V", "N", "G", "R", "T", "Q"],
  ["L", "T", "Q", "F"],
  ["Q", "C", "W", "Z", "B", "R", "G", "N"],
  ["F", "C", "L", "S", "N", "H", "M"],
  ["D", "N", "Q", "M", "T", "J"],
  ["P", "G", "S"],
];

// move 1 from 2 to 3
const instructions = input
  .replace(/[a-zA-Z]/g, "")
  .split("\n")
  .map((instruction) =>
    instruction
      .split(" ")
      .filter((item) => item !== "")
      .map((item) => parseInt(item, 10))
  );

/** Part 1 */
const moveIndividually = () => {
  instructions.forEach(([amount, from, to]) => {
    for (let i = 0; i < amount; i++) {
      crates[to - 1].push(crates[from - 1].pop());
    }
  });
};

/** Part 2 */
const movePairs = () => {
  instructions.forEach(([amount, from, to]) => {
    const start = crates[from - 1].length - amount;
    crates[to - 1].push(
      ...crates[from - 1].splice(start > 0 ? start : 0, amount)
    );
  });
};

movePairs();

const popped = crates.map((crate) => crate.pop());

console.log(popped.join(""));
