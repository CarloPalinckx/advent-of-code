const fs = require("fs");
const input = fs.readFileSync("8.txt", "utf-8");

const example = `30373
25512
65332
33549
35390`;

const grid = input
  .split("\n")
  .map((value) => value.split("").map((item) => parseInt(item, 10)));

/** Part 1 */
const visible = grid.map((row, rowIndex) => {
  return row.map((cell, columnIndex) => {
    /** Edges */
    if (
      rowIndex === 0 ||
      rowIndex === grid.length - 1 ||
      columnIndex === 0 ||
      columnIndex === row.length - 1
    ) {
      return true;
    }

    const column = grid.map((row) => row[columnIndex]);

    /** Left */
    if (Math.max(...row.slice(0, columnIndex)) < cell) {
      return true;
    }

    /** Right */
    if (Math.max(...row.slice(columnIndex + 1, row.length)) < cell) {
      return true;
    }

    /** Up */
    if (Math.max(...column.slice(0, rowIndex)) < cell) {
      return true;
    }

    /** Down */
    if (Math.max(...column.slice(rowIndex + 1, column.length)) < cell) {
      return true;
    }

    return false;
  });
});

const count = visible.reduce(
  (rowTotal, row) =>
    rowTotal + row.reduce((cellTotal, cell) => cellTotal + ~~cell, 0),
  0
);

/** Part 2 */

const score = (compare) => (items) => {
  let i = 0;
  let blocked = false;

  while (i < items.length && !blocked) {
    if (items[i] >= compare) {
      blocked = true;
    }

    i++;
  }

  if (!blocked) {
    return items.length;
  }

  return i;
};

const scenicScores = grid.map((row, rowIndex) => {
  return row.map((cell, columnIndex) => {
    const column = grid.map((row) => row[columnIndex]);
    const sc = score(cell);

    return (
      sc(column.slice(0, rowIndex).reverse()) *
      sc(row.slice(0, columnIndex).reverse()) *
      sc(column.slice(rowIndex + 1, column.length)) *
      sc(row.slice(columnIndex + 1, row.length))
    );
  });
});

const scenicScore = scenicScores.reduce((gridHighest, row) => {
  const rowHighest = row.reduce((highestCell, cell) => {
    return highestCell < cell ? cell : highestCell;
  }, 0);

  return rowHighest > gridHighest ? rowHighest : gridHighest;
}, 0);

console.log(scenicScore);
