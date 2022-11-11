import {
  showErrorMessage,
  checkAmountIsWithinLimit,
  getCurrencyLabel,
  getCurrencyBills,
  getBills,
  showBills,
  clearAmountInput,
} from './atm_functions';

import { saveWithdrawHistory } from './withdraw_history_functions';
import { showExchangeRate } from './exchange_rate_functions';

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

document
  .querySelectorAll("input[name='currency-selection']")
  .forEach((input) => {
    input.addEventListener('change', showExchangeRate);
  });
