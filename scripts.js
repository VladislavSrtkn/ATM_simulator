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
let cashWithdraw = document.getElementById('cashWithdraw');
let atmForm = document.getElementById('atm');

let currency;
let currencyLabel;

atmForm.onclick = function clearUserAmountInput(event) {
  if (event.target.className != 'btn-check') return;
  userAmount.value = '';
};

function errorMessage() {
  let errorMessage = document.createElement('h3');
  errorMessage.innerHTML = 'Error';
  cashWithdraw.append(errorMessage);
  throw new Error('error message');
}

function displayBills(result) {
  for (const withdrawNotes of result) {
    let container = document.createElement('h3');
    container.innerHTML =
      currencyLabel +
      JSON.stringify(withdrawNotes.value) +
      '  x  ' +
      JSON.stringify(withdrawNotes.count);
    cashWithdraw.append(container);
  }
  return result;
}

function getBills(currency, amount) {
  if (!amount || amount == 0) {
    errorMessage();
  }

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
    errorMessage();
  }
  displayBills(result);

  return result;
}

function processAtmFormSubmit(currency, amount) {
  cashWithdraw.innerHTML = '';
  getBills(currency, amount);
}