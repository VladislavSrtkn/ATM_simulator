let mix = require('laravel-mix');

mix.js('source/js/atm.js', 'index.js').setPublicPath('./dist');
mix
  .js('./source/js/withdraw_history.js', 'withdraw_history.js')
  .setPublicPath('./dist');

mix.css('./source/css/style.css', './dist').setPublicPath('./dist');
