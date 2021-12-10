const fs = require('fs');
const inputData = fs.readFileSync('./input', 'ascii');

const processData = (data) => {
  const dataArr = data.split('\n');
  return dataArr.map((entry) => entry.split(' ')).filter(entry => entry[0].length > 0).map(entry => { const res = {}; res[entry[0]] = parseInt(entry[1]); return res; });
};

const processedData = processData(inputData);
const getFinalPosition = (positionData) => {
  const finalPosition = {
    depth: 0,
    forward: 0
  };
  positionData.forEach(position => {
    finalPosition.depth -= position.up ? position.up : 0;
    finalPosition.depth += position.down ? position.down : 0;
    finalPosition.forward += position.forward ? position.forward : 0;
  })
  return finalPosition;
};

const finalPosition = getFinalPosition(processedData);

console.log(finalPosition.depth * finalPosition.forward);

const getCorrectedFinalPosition = (positionData) => {
  const finalPosition = {
    depth: 0,
    forward: 0,
    aim: 0
  };
  positionData.forEach(position => {
    if (position.up) {
      finalPosition.aim -= position.up;
    }
    if (position.down) {
      finalPosition.aim += position.down;
    }
    if (position.forward) {
      finalPosition.forward += position.forward;
      finalPosition.depth = finalPosition.depth + (finalPosition.aim * position.forward);
    }
  })
  return finalPosition;
};

//challenge 2
const correctedPosition = getCorrectedFinalPosition(processedData);
console.log(correctedPosition, finalPosition);
console.log(correctedPosition.depth * correctedPosition.forward);