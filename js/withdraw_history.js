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
  const withdrawHxistoryArray = JSON.parse(localStorage.getItem('withdrawals'));

  if (!withdrawHxistoryArray) {
    return;
  }

  const showHistoryContainer = document.getElementById('history');

  for (const withdrawObj of withdrawHxistoryArray) {
    const container = document.createElement('p');
    container.classList.add('history', 'my-3', 'py-2');

    container.innerHTML = `${withdrawObj.date} withdrawal operation, amount ${withdrawObj.currency} ${withdrawObj.amount}`;

    showHistoryContainer.append(container);
  }
}
