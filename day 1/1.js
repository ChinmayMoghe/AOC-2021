const fs = require('fs');
let numbers = fs.readFileSync('./input', 'ascii')
  .split('\n').filter(num => num.length > 0).map(Number);

const getIncreasedCount = (arr) => {
  let increasedCount = 0;
  arr.reduce((prev, current) => {
    if (current > prev) {
      increasedCount++;
    }
    return current;
  });
  return increasedCount;
};

console.log(getIncreasedCount(numbers));

const getWindowIncreasedCount = (arr, window_size) => {
  let increasedCount = 0;
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    let next = arr[i + window_size];
    if (next > current) {
      increasedCount++;
    }
  }
  return increasedCount;
};

console.log(getWindowIncreasedCount(numbers, 3));
