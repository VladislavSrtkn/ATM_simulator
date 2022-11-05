export {
  saveWithdrawHistory,
  showWithdrawHistory,
  getWithdrawHistory,
  clearWithdrawHistory,
};

import format from 'date-fns/format';

function saveWithdrawHistory(amount, currency) {
  const operationDetailsObj = {
    date: format(new Date(), 'eee MMM dd, y  kk:mm'),
    currency: currency,
    amount: amount,
  };

  let withdrawHistoryArray =
    localStorage.getItem('withdrawals') == null
      ? []
      : JSON.parse(localStorage.getItem('withdrawals'));

  withdrawHistoryArray.unshift(operationDetailsObj);

  localStorage.setItem('withdrawals', JSON.stringify(withdrawHistoryArray));
}

function showWithdrawHistory() {
  const withdrawHistoryArray = getWithdrawHistory();

  if (!withdrawHistoryArray) {
    return;
  }

  const showHistoryContainer = document.getElementById('history');

  for (const withdrawObj of withdrawHistoryArray) {
    const container = document.createElement('p');
    container.classList.add('history', 'my-3', 'py-2');

    container.innerHTML = `${withdrawObj.date} withdrawal operation, amount ${withdrawObj.currency} ${withdrawObj.amount}`;

    showHistoryContainer.append(container);
  }
}

function getWithdrawHistory() {
  const withdrawHistoryArray = JSON.parse(localStorage.getItem('withdrawals'));

  return withdrawHistoryArray;
}

function clearWithdrawHistory() {
  const showHistoryContainer = document.getElementById('history');
  localStorage.removeItem('withdrawals');
  showHistoryContainer.innerHTML = '';
}
