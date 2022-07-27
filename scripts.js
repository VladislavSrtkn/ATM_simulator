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

function processAtmFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const amount = formData.get('userAmount');
  const selectedCurrency = formData.get('currency-selection');

  if (!amount || amount == 0) {
    errorMessage();
    return;
  }

  currencySelection(selectedCurrency);

  getBills(currency, amount);
  const result = getBills(currency, amount);

  showBills(result);
}

document.getElementById('atm').addEventListener('submit', processAtmFormSubmit);

function errorMessage() {
  cashWithdraw.innerHTML = '';
  const errorMessage = document.createElement('h3');
  errorMessage.innerHTML = 'Error';
  cashWithdraw.append(errorMessage);
}

function currencySelection(selectedCurrency) {
  if (selectedCurrency == 'dollarUSA') {
    currency = dollarUSA;
    currencyLabel = '$';
  } else if (selectedCurrency == 'yenJapan') {
    currency = yenJapan;
    currencyLabel = '¥';
  } else if (selectedCurrency == 'hryvniaUkraine') {
    currency = hryvniaUkraine;
    currencyLabel = '₴';
  }
  return currency, currencyLabel;
}

function getBills(currency, amount) {
  const result = [];

  for (const note of currency) {
    const value = note.value;
    let count = note.count;
    const numberForCurrentNote = Math.floor(amount / value);

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
    const container = document.createElement('h3');
    container.innerHTML =
      currencyLabel +
      JSON.stringify(withdrawNotes.value) +
      '  x  ' +
      JSON.stringify(withdrawNotes.count);
    cashWithdraw.append(container);
  }

  userAmount.value = '';
}
