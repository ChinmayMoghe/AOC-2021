const fs = require('fs');
const inputData = fs.readFileSync('./input', 'ascii');
const getData = (data) => {
  return data.split('\n').filter(m => m.length);
};

const report = getData(inputData);

const getPowerConsumption = (report) => {
  let gamma_rate = '';
  let epsilon_rate = '';
  const bin_length = report[0].length;
  for (let i = 0; i < bin_length; i++) {
    let zero_count = 0;
    let one_count = 0;
    for (const reading of report) {
      if (reading[i] === '0') {
        zero_count += 1;
      } else {
        one_count += 1;
      }
    }
    gamma_rate += zero_count > one_count ? '0' : '1';
    epsilon_rate += zero_count > one_count ? '1' : '0';
  }
  gamma_rate = parseInt(gamma_rate, 2);
  epsilon_rate = parseInt(epsilon_rate, 2);
  const power_consumption = gamma_rate * epsilon_rate;
  return power_consumption;
};

console.log(getPowerConsumption(report));

const testCase = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

const getRating = (report, gas) => {
  const bin_length = report[0].length;
  const reduce = (report, index) => {
    const zero_elements = [];
    const one_elements = [];
    if (report.length === 1) {
      return report[0];
    }
    for (let entry of report) {
      if (entry[index] === '0') {
        zero_elements.push(entry);
      } else {
        one_elements.push(entry);
      }
    }
    let reducedArr;
    if (gas === 'O2') {
      reducedArr = one_elements.length >= zero_elements.length ? one_elements : zero_elements;
    } else {
      reducedArr = zero_elements.length <= one_elements.length ? zero_elements : one_elements;
    }
    return reduce(reducedArr, index + 1);
  }
  const rating = reduce(report, 0);
  return parseInt(rating, 2);
};

const o2_rating = (getRating(report, 'O2'));
const co2_rating = (getRating(report, 'CO2'));
const life_rating = o2_rating * co2_rating;
console.log({ life_rating });
