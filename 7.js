const fs = require("fs");
const input = fs.readFileSync("7.txt", "utf-8").split("\n");

class Dir {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.children = [];
    this.files = [];
  }

  root() {
    if (!this.parent) {
      return this;
    }

    return this.parent.root();
  }

  addChild(dir) {
    this.children.push(dir);
  }

  addFile(name, size) {
    this.files.push({ name, size: parseInt(size, 10) });
  }

  traverse(fn) {
    fn(this);

    this.children.forEach((child) => {
      child.traverse(fn);
    });
  }

  size() {
    return (
      this.files.reduce((total, { size }) => total + size, 0) +
      this.children.reduce((total, child) => total + child.size(), 0)
    );
  }
}

const crawl = ([head, ...tail], dir) => {
  if (!head) {
    return dir.root();
  }

  if (head.includes("$ cd")) {
    if (head === "$ cd ..") {
      return crawl(tail, dir.parent);
    }

    if (head === "$ cd /") {
      return crawl(tail, dir.root());
    }

    const subdir = new Dir(head.replace("$ cd ", ""), dir);
    dir.addChild(subdir, dir);

    return crawl(tail, subdir);
  }

  if (head.includes("$ ls")) {
    return crawl(tail, dir);
  }

  if (head.includes("dir")) {
    dir.addChild(new Dir(head.replace("dir ", ""), dir));

    return crawl(tail, dir);
  }

  dir.addFile(...head.split(" ").reverse());

  return crawl(tail, dir);
};

const tree = crawl(input, new Dir("/", null));

/** Part 1 */
let sum = 0;

tree.traverse((node) => {
  const size = node.size();

  if (size < 100000) {
    sum += size;
  }
});

/** Part 2 */

const remainder = 70000000 - tree.size();
const required = 30000000 - remainder;

let deleteSize = Infinity;

tree.traverse((node) => {
  const size = node.size();

  if (size >= required && size < deleteSize) {
    deleteSize = size;
  }
});

console.log(deleteSize);
