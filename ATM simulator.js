const USDollar = [
  { value: 100, count: 0 },
  { value: 50, count: 0 },
  { value: 20, count: 0 },
  { value: 10, count: 0 },
  { value: 5, count: 0 },
  { value: 2, count: 0 },
  { value: 1, count: 0 },
];

//_______________________________________________________________________
// value - note`s value
// count - count of banknotes
// a - number of banknotes for required amount

function bank(currency, amount) {
  for (const note of currency) {
    let value = note['value'];
    let count = note['count'];
    let a = Math.floor(amount / value);
    count += a;
    amount -= a * value;

    console.log(value, count);
  }
}

bank(USDollar, 1754);
