export { showExchangeRate, getExchangeRate, clearExchangeRateContainer };

import format from 'date-fns/format';

function showExchangeRate(event) {
  clearExchangeRateContainer();

  const input = event.target;
  const currency = input.value.toLowerCase();

  if (currency == 'usd') {
    return;
  }

  const exchangeRateContainer = document.getElementById(
    'exchange-rate-container'
  );
  const exchangeRateSpan = document.createElement('span');

  getExchangeRate(currency)
    .then((result) => {
      const currencyRate = result[currency].toFixed(2);
      const currencyName = currency.toUpperCase();
      const operationDate = format(new Date(result['date']), 'eee MMM dd, y');

      exchangeRateSpan.innerHTML = `Current exchange rate: 1 USD = ${currencyRate} ${currencyName}. Updated ${operationDate}`;
    })
    .catch((err) => {
      exchangeRateSpan.innerHTML = `Unable to load exchange rate data. Please try again later.`;
      console.log(err);
    });

  exchangeRateContainer.append(exchangeRateSpan);
}

async function getExchangeRate(currency) {
  const response = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${currency}.json`
  );
  const rate = await response.json();

  return rate;
}

function clearExchangeRateContainer() {
  document.getElementById('exchange-rate-container').innerHTML = '';
}
