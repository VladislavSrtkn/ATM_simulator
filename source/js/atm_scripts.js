export {
  showErrorMessage,
  checkAmountIsWithinLimit,
  getCurrencyLabel,
  getCurrencyBills,
  getBills,
  showBills,
  clearAmountInput,
};

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
