'use strict';

const thermometer = require('./thermometer')();
const accelerometer = require('./accelerometer')();
const microphone = require('./microphone')();

// I don't think I would have used the factory function pattern for 
// the modules in this project. Just seems like extra work.
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
        })
    };
};
