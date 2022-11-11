import {
  clearWithdrawHistory,
  getWithdrawHistory,
} from './withdraw_history_functions';

import format from 'date-fns/format';

document.addEventListener('DOMContentLoaded', showWithdrawHistory);

document
  .getElementById('clear-hist-btn')
  .addEventListener('click', clearWithdrawHistory);

document
  .getElementById('clear-hist-btn')
  .addEventListener('click', clearWithdrawHistoryContainer);

function showWithdrawHistory() {
  const withdrawHistoryArray = getWithdrawHistory();

  const emptyHistoryContainer = document.getElementById('emptyHistory');
  const notEmptyHistoryContainer = document.getElementById('forShowHistory');

  if (!withdrawHistoryArray) {
    emptyHistoryContainer.classList.remove('d-none');

    return;
  }

  notEmptyHistoryContainer.classList.remove('d-none');

  const showHistoryContainer = document.getElementById('history');

  for (const withdrawObj of withdrawHistoryArray) {
    const container = document.createElement('p');
    container.classList.add('history', 'my-3', 'py-2');

    const formattedDate = format(
      new Date(withdrawObj.date),
      'eee MMM dd, y  kk:mm'
    );

    container.innerHTML = `${formattedDate} withdrawal operation, amount ${withdrawObj.currency} ${withdrawObj.amount}`;

    showHistoryContainer.append(container);
  }
}

function clearWithdrawHistoryContainer() {
  const showHistoryContainer = document.getElementById('history');
  const emptyHistoryContainer = document.getElementById('emptyHistory');
  const notEmptyHistoryContainer = document.getElementById('forShowHistory');

  emptyHistoryContainer.classList.remove('d-none');
  notEmptyHistoryContainer.classList.add('d-none');

  showHistoryContainer.innerHTML = '';
}
