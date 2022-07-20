const dollarUSA = [
  { value: 100, count: 0 },
  { value: 50, count: 0 },
  { value: 20, count: 0 },
  { value: 10, count: 0 },
  { value: 5, count: 0 },
  { value: 2, count: 0 },
  { value: 1, count: 0 },
];

const hryvniaUkraine = [
  { value: 500, count: 0 },
  { value: 200, count: 0 },
  { value: 100, count: 0 },
  { value: 50, count: 0 },
  { value: 20, count: 0 },
  { value: 10, count: 0 },
  { value: 5, count: 0 },
  { value: 2, count: 0 },
  { value: 1, count: 0 },
];

const yenJapan = [
  { value: 10000, count: 0 },
  { value: 5000, count: 0 },
  { value: 2000, count: 0 },
  { value: 1000, count: 0 },
  { value: 500, count: 0 },
  { value: 100, count: 0 },
  { value: 50, count: 0 },
  { value: 10, count: 0 },
  { value: 5, count: 0 },
  { value: 1, count: 0 },
];

let userAmount = document.querySelector('#userAmount');
let cashResult = document.querySelector('#result');
let currency;
let currencyLabel;

let cashWithdraw = document.getElementById('cashWithdraw');

function bank(currency, amount) {
  if (USD.checked) {
    currency = dollarUSA;
    currencyLabel = '$';
  } else if (JPY.checked) {
    currency = yenJapan;
    currencyLabel = '¥';
  } else if (UAH.checked) {
    currency = hryvniaUkraine;
    currencyLabel = '₴';
  }

  cashWithdraw.innerHTML = '';

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
    let errorMessage = document.createElement('h3');
    errorMessage.innerHTML = 'Error';
    cashWithdraw.append(errorMessage);
    throw new Error('error message');
  }

  for (const finNotes of result) {
    let container = document.createElement('h6');
    container.innerHTML =
      currencyLabel +
      JSON.stringify(finNotes.value) +
      '  x  ' +
      JSON.stringify(finNotes.count);
    cashWithdraw.append(container);
  }

  return result;
}
