'use strict';

const thermometer = require('./thermometer')();
const accelerometer = require('./accelerometer')();
const microphone = require('./microphone')();

module.exports = function getData() {
    return function getData() {
        return Promise.all([
            thermometer(),
            accelerometer(),
            microphone()
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
        });
    };
};
