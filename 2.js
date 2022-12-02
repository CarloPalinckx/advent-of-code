const fs = require("fs");
const strategy = fs.readFileSync("2.txt", "utf-8");

const moves = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
  X: "Rock",
  Y: "Paper",
  Z: "Scissors",
};

const beats = {
  Rock: "Scissors",
  Paper: "Rock",
  Scissors: "Paper",
};

const points = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

/** Part 1 */
const total = strategy.split("\n").reduce((total, round) => {
  const [a, b] = round.split(" ");
  const roundpoints = total + points[moves[b]];

  if (moves[b] === moves[a]) return roundpoints + 3;
  if (beats[moves[b]] === moves[a]) return roundpoints + 6;
  return roundpoints;
}, 0);

/** Part 2 */
const results = strategy.split("\n").reduce((total, round) => {
  const [a, b] = round.split(" ");
  if (b === "X") return total + points[beats[moves[a]]]; // lose
  if (b === "Y") return total + points[moves[a]] + 3; // draw
  /** The circular lookup with beats[beats[moves[a]]] was fun to find */
  if (b === "Z") return total + points[beats[beats[moves[a]]]] + 6; // win
}, 0);

console.log(results);

/** Recursive version */
const collect = ([head, ...tail], total) => {
  if (head === undefined) {
    return total;
  }

  const [a, b] = head.split(" ");

  if (b === "X") return collect(tail, total + points[beats[moves[a]]]); // lose
  if (b === "Y") return collect(tail, total + points[moves[a]] + 3); // draw
  /** The circular lookup with beats[beats[moves[a]]] was fun to find */
  if (b === "Z")
    return collect(tail, total + points[beats[beats[moves[a]]]] + 6); // win
};

console.log(collect(strategy.split("\n"), 0));
