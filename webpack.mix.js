let mix = require('laravel-mix');

mix.setPublicPath('./dist');

mix.js('source/js/atm.js', 'index.js');
mix.js('./source/js/withdraw_history.js', 'withdraw_history.js');

mix.css('./source/css/templateBT.css', 'style.css');
mix.css('./source/css/custom.css', 'style.css');
