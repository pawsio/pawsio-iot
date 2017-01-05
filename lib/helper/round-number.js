'use strict';

module.exports = function roundNum(num, decimalPlaces) {
    console.log(num, 'roundnumber');
    let extraNum = (1 / (Math.pow(10, decimalPlaces) * 1000));
    return (Math.round((num + extraNum)
        * (Math.pow(10, decimalPlaces))) / Math.pow(10, decimalPlaces));
};
