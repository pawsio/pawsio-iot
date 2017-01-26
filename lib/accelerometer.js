'use strict';

const roundNumber = require('./helper/round-number');
const vectorLength = require('./helper/vector-length');

module.exports = function accelerometerSetup() {
    const digitalAccelerometer = require('jsupm_mma7660');
    // Instantiate an MMA7660 on I2C bus 0
    const myDigitalAccelerometer = new digitalAccelerometer.MMA7660(
                    digitalAccelerometer.MMA7660_I2C_BUS,
                    digitalAccelerometer.MMA7660_DEFAULT_I2C_ADDR);
    myDigitalAccelerometer.setSampleRate(digitalAccelerometer.MMA7660.AUTOSLEEP_64);

    // place device in standby mode so we can write registers
    myDigitalAccelerometer.setModeStandby();

    // enable 64 samples per second
    myDigitalAccelerometer.setSampleRate(digitalAccelerometer.MMA7660.AUTOSLEEP_64);

    // place device into active mode
    myDigitalAccelerometer.setModeActive();

    let ax, ay, az;
    ax = digitalAccelerometer.new_floatp();
    ay = digitalAccelerometer.new_floatp();
    az = digitalAccelerometer.new_floatp();

    // acceleration must be multiplied by this and it will give meters pers second square
    let gForce = 9.8;

    // When exiting: clear interval and print message
    // listening for SIGINT
    // TODO: should this be in main?
    process.on('SIGINT', () => {
        // clean up memory
        digitalAccelerometer.delete_floatp(ax);
        digitalAccelerometer.delete_floatp(ay);
        digitalAccelerometer.delete_floatp(az);
        myDigitalAccelerometer.setModeStandby();
        console.log('Exiting...');
        process.exit(0);
    });

    return function accelerometerValues() {
        myDigitalAccelerometer.getAcceleration(ax, ay, az);
        let x = roundNumber(digitalAccelerometer.floatp_value(ax), 6) * gForce;
        let y = roundNumber(digitalAccelerometer.floatp_value(ay), 6) * gForce;
        let z = roundNumber(digitalAccelerometer.floatp_value(az), 6) * gForce;
        let acceleration = vectorLength(x, y, z, gForce);
        console.log(`x=${x}, y=${y}, z=${z}, acceleration=${acceleration}`);
        return new Promise((resolve) => {
            resolve({x, y, z, acceleration});
        });
    };
};
