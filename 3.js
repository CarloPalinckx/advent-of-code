const fs = require("fs");
const input = fs.readFileSync("3.txt", "utf-8");
const items = input.split("\n");

const charToPrio = (char) =>
  (char.toLowerCase() === char
    ? char.charCodeAt(0) - "a".charCodeAt(0)
    : char.charCodeAt(0) - "A".charCodeAt(0) + charToPrio("z")) + 1;

const findMatch = ([head, ...tail], b, c) =>
  b.includes(head) && c.includes(head) ? head : findMatch(tail, b, c);

/** Custom iterators are cool! */
function* loopPerN(items, n) {
  let i = 0;
  let group = [];

  while (i < items.length) {
    if (group.length < n) {
      group.push(items[i]);
    } else {
      yield group;
      group = [items[i]];
    }

    i++;
  }

  // yield final accumlated group
  yield group;
}

let sum = 0;

for (const [a, b, c] of loopPerN(items, 3)) {
  sum += charToPrio(findMatch(a.split(""), b.split(""), c.split("")));
}

console.log(sum);
