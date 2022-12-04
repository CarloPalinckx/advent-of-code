const fs = require("fs");
const input = fs.readFileSync("4.txt", "utf-8");
const pairs = input.split("\n");
const splitPairs = pairs.map((pair) => pair.split(","));

/** Part 1 */
const containingPairs = splitPairs.filter(([a, b]) => {
  const [aLower, aUpper] = a.split("-").map((aa) => parseInt(aa, 10));
  const [bLower, bUpper] = b.split("-").map((bb) => parseInt(bb, 10));

  return (
    (aLower >= bLower && aUpper <= bUpper) ||
    (bLower >= aLower && bUpper <= aUpper)
  );
});

/** Part 2 */
const overlappingPairs = splitPairs.filter(([a, b]) => {
  const [aLower, aUpper] = a.split("-").map((aa) => parseInt(aa, 10));
  const [bLower, bUpper] = b.split("-").map((bb) => parseInt(bb, 10));

  return (
    (aLower >= bLower && aLower <= bUpper) ||
    (bLower >= aLower && bLower <= aUpper)
  );
});

console.log(overlappingPairs.length);
