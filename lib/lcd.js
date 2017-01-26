'use strict';

module.exports = function initiateLCD() {
    const LCD = require('jsupm_i2clcd');
    const i2cPort = 3;
    const myLcd = new LCD.Jhd1313m1(i2cPort, 0x3E, 0x62);
    myLcd.setColor(107, 220, 247);

    return function displayMessage(x, y, message) {
        // TODO: study repo on way to make the message loop across the screen
        myLcd.setCursor(x, y);
        myLcd.write(message);
    };
};
