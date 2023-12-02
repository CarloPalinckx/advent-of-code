const fs = require("fs");
/** DAY 1 */

const caloriesList = fs.readFileSync("1.txt", "utf-8");

const elfs = caloriesList
  .split("\n\n")
  .map((elf) => elf.split("\n"))
  .map((elf) => elf.reduce((total, item) => total + parseInt(item, 10), 0))
  .sort()
  .reverse();

// console.log(elfs, 68442 + 68218 + 68177);

/** Recursive version */
const collect = ([head, ...tail], total, collection) => {
  if (head === undefined) return collection;
  if (head === "") return collect(tail, 0, [...collection, total]);
  return collect(tail, total + parseInt(head, 10), collection);
};

console.log(collect(caloriesList.split("\n"), 0, []).sort().reverse());
