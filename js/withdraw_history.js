document.addEventListener('DOMContentLoaded', showWithdrawHistory);

document
  .getElementById('clear-hist-btn')
  .addEventListener('click', clearWithdrawHistory);

function clearWithdrawHistory() {
  const showHistoryContainer = document.getElementById('history');
  localStorage.removeItem('withdrawals');
  showHistoryContainer.innerHTML = '';
}

function showWithdrawHistory() {
  if (localStorage.getItem('withdrawals') == null) {
    return;
  }

  const showHistoryContainer = document.getElementById('history');
  const withdrawHistoryArray = localStorage.getItem('withdrawals').split('-');

  for (let i = withdrawHistoryArray.length - 1; i >= 0; i--) {
    const operationDetailsObj = JSON.parse(withdrawHistoryArray[i]);

    const container = document.createElement('p');
    container.classList.add('history', 'my-3', 'py-2');

    container.innerHTML = `${operationDetailsObj.date} withdrawal operation, amount ${operationDetailsObj.currency} ${operationDetailsObj.amount}`;

    showHistoryContainer.append(container);
  }
}
