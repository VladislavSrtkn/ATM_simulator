import {
  showWithdrawHistory,
  clearWithdrawHistory,
} from './withdraw_history_functions';

document.addEventListener('DOMContentLoaded', showWithdrawHistory);

document
  .getElementById('clear-hist-btn')
  .addEventListener('click', clearWithdrawHistory);
