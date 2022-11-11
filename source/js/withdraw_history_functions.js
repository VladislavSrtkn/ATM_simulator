export { saveWithdrawHistory, getWithdrawHistory, clearWithdrawHistory };

function saveWithdrawHistory(amount, currency) {
  const operationDetailsObj = {
    date: new Date(),
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

function getWithdrawHistory() {
  const withdrawHistoryArray = JSON.parse(localStorage.getItem('withdrawals'));

  return withdrawHistoryArray;
}

function clearWithdrawHistory() {
  localStorage.removeItem('withdrawals');
}
