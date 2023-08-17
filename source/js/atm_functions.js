export { getCurrencyLabel, getCurrencyBills, getBills, getLimit };

function getLimit(currency) {
  const withdrawLimits = {
    USD: 2000,
    JPY: 300000,
    RUB: 250000,
  };

  return withdrawLimits[currency];
}

function getCurrencyLabel(currency) {
  const currencyLabels = {
    USD: '$',
    JPY: '¥',
    RUB: '₽',
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
    RUB: [
      { value: 5000 },
      { value: 2000 },
      { value: 1000 },
      { value: 500 },
      { value: 200 },
      { value: 100 },
      { value: 50 },
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
