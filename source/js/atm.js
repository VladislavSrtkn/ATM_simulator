import {
  showErrorMessage,
  checkAmountIsWithinLimit,
  getCurrencyLabel,
  getCurrencyBills,
  getBills,
  showBills,
  clearAmountInput,
} from './atm_scripts';

import { saveWithdrawHistory } from './withdraw_history_scripts';
import {
  showExchangeRate,
  getExchangeRate,
  clearExchangeRateContainer,
} from './exchange_rate_scripts';

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

// Exchange rate from rest API

// function showExchangeRate(event) {
//   clearExchangeRateContainer();

//   const input = event.target;
//   const currency = input.value.toLowerCase();

//   if (currency == 'usd') {
//     return;
//   }

//   const exchangeRateContainer = document.getElementById(
//     'exchange-rate-container'
//   );
//   const exchangeRateSpan = document.createElement('span');

//   getExchangeRate(currency)
//     .then((result) => {
//       const currencyRate = result[currency].toFixed(2);
//       const currencyName = currency.toUpperCase();
//       const operationDate = format(new Date(result['date']), 'eee MMM dd, y');

//       exchangeRateSpan.innerHTML = `Current exchange rate: 1 USD = ${currencyRate} ${currencyName}. Updated ${operationDate}`;
//     })
//     .catch(
//       () =>
//         (exchangeRateSpan.innerHTML = `Unable to load exchange rate data. Please try again later.`)
//     );

//   exchangeRateContainer.append(exchangeRateSpan);
// }

// async function getExchangeRate(currency) {
//   const response = await fetch(
//     `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${currency}.json`
//   );
//   const rate = await response.json();

//   return rate;
// }

// function clearExchangeRateContainer() {
//   document.getElementById('exchange-rate-container').innerHTML = '';
// }

document
  .querySelectorAll("input[name='currency-selection']")
  .forEach((input) => {
    input.addEventListener('change', showExchangeRate);
  });
