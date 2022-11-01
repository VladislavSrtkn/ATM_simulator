document.addEventListener('DOMContentLoaded', showWithdrawHistory);

document
  .getElementById('clear-hist-btn')
  .addEventListener('click', clearWithdrawHistory);

function clearWithdrawHistory() {
  const showHistoryContainer = document.getElementById('history');
  localStorage.clear();
  showHistoryContainer.innerHTML = '';
}

function showWithdrawHistory() {
  const showHistoryContainer = document.getElementById('history');

  for (let i = localStorage.length; i > 0; i--) {
    const container = document.createElement('p');
    container.classList.add('history', 'my-3', 'py-2');
    container.innerHTML = localStorage.getItem(i - 1);
    showHistoryContainer.append(container);
  }
}
