'use strict';

const convertTemp = require('./helper/convert-temp');

module.exports = function initializeThermometer() {
    const groveSensor = require('jsupm_grove');
    const tempSensor = new groveSensor.GroveTemp(0);

    return function getTemp() {
        return new Promise((resolve) => {
            let temperature = convertTemp(tempSensor.value());
            resolve({temperature});
        });
    };
};
