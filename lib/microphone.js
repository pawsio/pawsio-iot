'use strict';

module.exports = function micSetup() {
    const upmMicrophone = require('jsupm_mic');
    // Attach microphone to analog port A0
    const micPort = 2;
    const myMic = new upmMicrophone.Microphone(micPort);
    const threshContext = new upmMicrophone.thresholdContext;
    threshContext.averageReading = 0;
    threshContext.runningAverage = 0;
    threshContext.averagedOver = 2;
    // Repeatedly, take a sample every 2 microseconds;
    // find the average of 128 samples;
    return function getMicReading() {
        let buffer = new upmMicrophone.uint16Array(128);
        let len = myMic.getSampledWindow(2, 128, buffer);
        return new Promise((resolve) => {
            let threshold = myMic.findThreshold(threshContext, 30, buffer, len);
            resolve({threshold});
        });
    };
};
