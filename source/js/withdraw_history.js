import {
  showWithdrawHistory,
  clearWithdrawHistory,
} from './withdraw_history_scripts';

document.addEventListener('DOMContentLoaded', showWithdrawHistory);

document
  .getElementById('clear-hist-btn')
  .addEventListener('click', clearWithdrawHistory);
