import {
  getCurrencyLabel,
  getCurrencyBills,
  getBills,
  getLimit,
} from './atm_functions';

import { saveWithdrawHistory } from './withdraw_history_functions';
import { showExchangeRate } from './exchange_rate';

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

function showErrorMessage(message) {
  const showResultContainer = document.getElementById('cashWithdraw');
  showResultContainer.innerHTML = '';
  const errorMessage = document.createElement('h3');
  errorMessage.innerHTML = message;
  showResultContainer.append(errorMessage);
}

function checkAmountIsWithinLimit(currency, amount) {
  const limit = getLimit(currency);

  if (amount > limit) {
    clearAmountInput();
    showErrorMessage(`Сash withdrawal limit ${limit} ${currency}`);
    return false;
  } else return true;
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

document.getElementById('atm').addEventListener('submit', processAtmFormSubmit);

document
  .querySelectorAll("input[name='currency-selection']")
  .forEach((input) => {
    input.addEventListener('change', clearAmountInput);
  });

document
  .querySelectorAll("input[name='currency-selection']")
  .forEach((input) => {
    input.addEventListener('change', showExchangeRate);
  });
