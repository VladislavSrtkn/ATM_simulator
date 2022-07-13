const dollarUSA = [
  { value: 100, count: 0 },
  { value: 50, count: 0 },
  { value: 20, count: 0 },
  { value: 10, count: 0 },
  { value: 5, count: 0 },
  { value: 2, count: 0 },
  { value: 1, count: 0 },
];

const batThailand = [
  { value: 1000, count: 0 },
  { value: 500, count: 0 },
  { value: 100, count: 0 },
  { value: 50, count: 0 },
  { value: 20, count: 0 },
];

let userAmoun = document.querySelector('#userAmount');
let cashResult = document.querySelector('#result');

function bank(currency, amount) {
  let result = [];
  for (const note of currency) {
    let value = note.value;
    let count = note.count;
    let numberForCurrentNote = Math.floor(amount / value);

    count = numberForCurrentNote;
    amount -= numberForCurrentNote * value;

    if (count > 0) {
      result.push({ value, count });
    }
  }
  if (amount != 0) {
    throw new Error('error message');
  }
  cashResult.innerHTML = JSON.stringify(result);
  return result;
}
