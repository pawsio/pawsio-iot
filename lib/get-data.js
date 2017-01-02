'use strict';

const convertTemp = require('./helper/convert-temp');

module.exports = function initializeSensors() {
    const groveSensor = require('jsupm_grove');
    const tempSensor = new groveSensor.GroveTemp(0);

    return function getData() {
        return new Promise((resolve) => {
            let temp = convertTemp(tempSensor.value());
            resolve({
                temperature: temp
            });
        });
    };
};