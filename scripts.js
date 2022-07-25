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

const currencySelectionGroup = document.querySelector('.btn-group');

currencySelectionGroup.onclick = function clearUserAmountInput(event) {
  if (event.target.className != 'btn-check') return;
  userAmount.value = '';
};

let currency;
let currencyLabel;

function processAtmFormSubmit() {
  const cashWithdraw = document.getElementById('cashWithdraw');

  let amount = document.querySelector('#userAmount').value;

  if (!amount || amount == 0) {
    errorMessage();
    return;
  }

  getBills(currency, amount);
  const result = getBills(currency, amount);

  showBills(result);
}

function errorMessage() {
  cashWithdraw.innerHTML = '';
  let errorMessage = document.createElement('h3');
  errorMessage.innerHTML = 'Error';
  cashWithdraw.append(errorMessage);
}

function getBills(currency, amount) {
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
  const result = [];

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

  return result;
}

function showBills(result) {
  cashWithdraw.innerHTML = '';

  for (const withdrawNotes of result) {
    let container = document.createElement('h3');
    container.innerHTML =
      currencyLabel +
      JSON.stringify(withdrawNotes.value) +
      '  x  ' +
      JSON.stringify(withdrawNotes.count);
    cashWithdraw.append(container);
  }

  userAmount.value = '';
}
