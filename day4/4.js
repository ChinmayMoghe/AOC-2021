const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, './input'), 'ascii');
const getBingoData = (input) => {
  const bingoCalls = input.split('\n')[0].split(',').map(Number);
  const boardData = input.split('\n').slice(1).filter(m => m.length > 0);
  let board = [];
  let boardScoreMap = new Map();
  for (let i = 0; i < boardData.length; i++) {
    board.push(boardData[i].trim().split(/\s+/).map(Number));
    if (board.length % 5 === 0 && board.length !== 0) {
      boardScoreMap.set(Math.floor((i + 1) / 5), { board, cells: board.flat(), isComplete: false })
      board = [];
    }
  }
  return [bingoCalls, boardScoreMap];
};
const [bingoCalls, boardScoreMap] = getBingoData(input);

const getRowSum = (board) => {
  const row_sums = [];
  for (let row of board) {
    row_sums.push(row.reduce((prev, current) => { return prev + current }));
  }
  return row_sums;
}

const getColSum = (board) => {
  const col_max = board.length;
  const col_sums = [];
  for (let i = 0; i < col_max; i++) {
    let col_sum = 0;
    for (let row of board) {
      col_sum += row[i]
    }
    col_sums.push(col_sum);
  }
  return col_sums;
};
const getIndex = (cells, number) => {
  const row_count = 5;
  const col_count = 5;
  currentIndex = cells.indexOf(number);
  row = Math.floor(currentIndex / row_count);
  col = currentIndex % col_count;
  return [currentIndex, row, col];
};
const checkIfNumberExists = (cells, number) => cells.includes(number);
const checkComplete = (rowSum, colSum) => {
  const checkSum = sum => sum === -5;
  if (rowSum.some(checkSum) || colSum.some(checkSum)) {
    return true;
  }
  return false;
};
const markComplete = (boardVal, status) => boardVal.isComplete = status;
const markBoard = (board, [row, col]) => board[row][col] = -1;
const markCell = (cells, index) => cells[index] = -1;
const processBingoCall = (boardVal, key, map, call) => {
  const { board, cells } = boardVal;
  if (checkIfNumberExists(cells, call)) {
    const [cell, row, col] = getIndex(cells, call);
    if (!board.isComplete) {
      markCell(cells, cell);
      markBoard(board, [row, col]);
    } else { return; }
    const rowSum = getRowSum(board);
    const colSum = getColSum(board);
    const boardComplete = checkComplete(rowSum, colSum);
    if (boardComplete) {
      markComplete(boardVal, boardComplete);
    }
  }
};
const partOneSum = () => {
  const winner = [];
  const calls = [];
  let breakLoop = false;
  for (const call of bingoCalls) {
    calls.push(call);
    boardScoreMap.forEach((value, key, map) => {
      processBingoCall(value, key, map, call);
      if (value.isComplete) {
        winner.push(value);
        breakLoop = true;
      }
      if (breakLoop) { return; }
    });
    if (breakLoop) { break; }
  };
  const sum = winner[0].cells.filter(num => num !== -1).reduce((prev, curr) => prev + curr);
  const lastCall = calls[calls.length - 1];
  const partOne = sum * lastCall;
  return partOne;
};
const partTwoSum = () => {
  let lastWinner;
  let lastCall;
  const keys = [];
  for (const call of bingoCalls) {
    boardScoreMap.forEach((value, key, map) => {
      if (!keys.includes(key)) {
        processBingoCall(value, key, map, call);
      }
      if (value.isComplete && !keys.includes(key)) {
        lastWinner = value;
        lastCall = call;
        keys.push(key);
      }
    });
  };
  const sum = lastWinner.cells.filter(num => num !== -1).reduce((prev, curr) => prev + curr);
  const partTwo = sum * lastCall;
  return partTwo;
};

console.log(partOneSum());
console.log(partTwoSum());