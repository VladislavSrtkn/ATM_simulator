function processAtmFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const amount = formData.get('userAmount');
  const selectedCurrency = formData.get('currency-selection');

  if (!amount || amount == 0) {
    showErrorMessage('Please enter amount you want to withdraw');
    return;
  }

  if (!checkAmountIsWithinLimit(selectedCurrency, amount)) {
    return;
  }

  const currencyBills = getCurrencyBills(selectedCurrency);
  const currencyLabel = getCurrencyLabel(selectedCurrency);

  const result = getBills(currencyBills, amount);

  saveWithdrawHistory(amount, currencyLabel);

  showBills(result, currencyLabel);
  clearAmountInput();
}

document.getElementById('atm').addEventListener('submit', processAtmFormSubmit);

document
  .querySelectorAll("input[name='currency-selection']")
  .forEach((input) => {
    input.addEventListener('change', clearAmountInput);
  });

function showErrorMessage(message) {
  const showResultContainer = document.getElementById('cashWithdraw');
  showResultContainer.innerHTML = '';
  const errorMessage = document.createElement('h3');
  errorMessage.innerHTML = message;
  showResultContainer.append(errorMessage);
}

function checkAmountIsWithinLimit(currency, amount) {
  const withdrawLimits = {
    USD: 2000,
    JPY: 300000,
    UAH: 70000,
  };

  if (amount > withdrawLimits[currency]) {
    clearAmountInput();
    showErrorMessage(
      `Сash withdrawal limit ${withdrawLimits[currency]} ${currency}`
    );
    return false;
  } else return true;
}

function getCurrencyLabel(currency) {
  const currencyLabels = {
    USD: '$',
    JPY: '¥',
    UAH: '₴',
  };

  return currencyLabels[currency];
}

function getCurrencyBills(currency) {
  const currencyBills = {
    USD: [
      { value: 100 },
      { value: 50 },
      { value: 20 },
      { value: 10 },
      { value: 5 },
      { value: 2 },
      { value: 1 },
    ],
    JPY: [
      { value: 10000 },
      { value: 5000 },
      { value: 2000 },
      { value: 1000 },
      { value: 500 },
      { value: 100 },
      { value: 50 },
      { value: 10 },
      { value: 5 },
      { value: 1 },
    ],
    UAH: [
      { value: 500 },
      { value: 200 },
      { value: 100 },
      { value: 50 },
      { value: 20 },
      { value: 10 },
      { value: 5 },
      { value: 2 },
      { value: 1 },
    ],
  };

  return currencyBills[currency];
}

function getBills(currency, amount) {
  const result = [];

  for (const note of currency) {
    const value = note.value;
    let count = Math.floor(amount / value);

    amount -= count * value;

    if (count > 0) {
      result.push({ value, count });
    }
  }

  return result;
}

function showBills(result, label) {
  const showResultContainer = document.getElementById('cashWithdraw');
  showResultContainer.innerHTML = '';

  for (const withdrawNotes of result) {
    const container = document.createElement('h3');
    container.innerHTML =
      label + withdrawNotes.value + '  x  ' + withdrawNotes.count;

    showResultContainer.append(container);
  }
}

function clearAmountInput() {
  document.getElementById('userAmount').value = '';
}

function saveWithdrawHistory(amount, currency) {
  const operationTime = new Date();
  const operationDetails = `${operationTime.getDate()}/${
    operationTime.getMonth() + 1
  }/${operationTime.getFullYear()} ${operationTime.getHours()}:${
    operationTime.getMinutes() > 9
      ? operationTime.getMinutes()
      : '0' + operationTime.getMinutes()
  } withdrawal operation, amount ${currency} ${amount} `;

  localStorage.setItem(localStorage.length, operationDetails);
}

// Exchange rate from rest API
function clearExchangeRateCont() {
  document.getElementById('exchange-rate-container').innerHTML = '';
}

async function getExchangeRate(currency) {
  const response = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${currency}.json`
  );
  const rate = await response.json();

  return rate;
}

function showExchangeRate(event) {
  clearExchangeRateCont();

  const input = event.target;
  const currency = input.value.toLowerCase();

  if (currency == 'usd') {
    return;
  }

  const showExcngRateContainer = document.getElementById(
    'exchange-rate-container'
  );
  const showExcngRateP = document.createElement('span');

  getExchangeRate(currency).then(
    (result) =>
      (showExcngRateP.innerHTML = `Current exchange rate: 1 USD = ${result[
        currency
      ].toFixed(2)} ${currency.toUpperCase()}. Last update ${result['date']}`)
  );

  showExcngRateContainer.append(showExcngRateP);
}

document
  .querySelectorAll("input[name='currency-selection']")
  .forEach((input) => {
    input.addEventListener('change', showExchangeRate);
  });
