//convert Celsius to Fahrenheit
module.exports = function convertTemp(celsius) {
    return Math.round((celsius * 9.0 / 5.0) + 32.0);
};
