// this file is used for testing data structures and syntax

const map1 = new Map();

map1.set("a", 1);
map1.set("b", 2);
map1.set("c", 3);

map1.delete("b");
console.log(map1.size);

let testArr = [2, 5, 6, 3, 8, 9];

let newArr = testArr.map(function (val, index) {
  return { key: index, value: val * val };
});

console.log(newArr);
