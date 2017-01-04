'use strict';

const thermometer = require('./thermometer')();
const accelerometer = require('./accelerometer')();

module.exports = function getData() {
    return function getData() {
        return Promise.all([
            thermometer(),
            accelerometer()
        ])
        .then((dataArray) => {
            let payload = {}; 
            dataArray.reduce((acc, curr) => {
                Object.keys(curr).forEach((element) => {
                    acc[element] = curr[element];
                });
                return acc;
            }, payload);
            payload.date = new Date().toISOString();
            return payload;
        })
    };
};