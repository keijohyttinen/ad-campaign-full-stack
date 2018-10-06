const currencySign = '€';

function currencyFormat(num) {
    num = isNaN(num) || num === '' || num === null ? 0.00 : num;
    return parseFloat(num).toFixed(2).toString().concat(` ${currencySign}`);
}

exports.currencyFormat = currencyFormat;