const fs = require("fs");
const input = fs.readFileSync("6.txt", "utf-8");

const getMarker = (n) => {
  let marker = null;
  let i = 0;

  while (i < input.length && !marker) {
    const set = new Set(input.slice(i - n, i));

    if (set.size === n) {
      marker = set;
    } else {
      i++;
    }
  }

  return i;
};

/** Part 1 */
console.log(getMarker(4));
/** Part 2 */
console.log(getMarker(14));
