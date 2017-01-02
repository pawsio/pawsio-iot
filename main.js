/*
 * Blank IoT Node.js starter app.
 *
 * Use this template to start an IoT Node.js app on any supported IoT board.
 * The target board must support Node.js. It is helpful if the board includes
 * support for I/O access via the MRAA and UPM libraries.
 *
 * https://software.intel.com/en-us/xdk/docs/lp-xdk-iot
 */


// keep /*jslint and /*jshint lines for proper jshinting and jslinting
// see http://www.jslint.com/help.html and http://jshint.com/docs
/* jslint node:true */
/* jshint unused:true */

'use strict';

const mraa = require('mraa');
const testApi = require('./lib/api/test-api');
const userApi = require('./lib/api/users-api');
const petsApi = require('./lib/api/pets-api');
const petSnapShotApi = require('./lib/api/pet-snapshots-api');
const getData = require('./lib/get-data')();

// TODO: I think for our purposes we assume user already signed up with our service

const user = require('./lib/setup/userinfo');
const pet = require('./lib/setup/petinfo');
let token = '';
let petId = '';

function main() {
    // first check token
    if(!token) {
        return userApi
                    .signin(user)
                    .then(res => { token = res.token; })
                    .catch(err => console.error(err));
    };
    // next check for the pets id
    console.log('token', token);
    if(!petId) {
        let qstring = `?name=${pet.name}&owner=${user.username}&animal=${pet.animal}`;
        return petsApi
                    .getQstring(token, qstring)
                    .then(res => {
                        if (res.length === 0) return petsApi.addPet(token, pet);
                        else petId = res[0]._id; 
                    })
                    .catch(err => console.error(err));
    };
    console.log('petId', petId);
    // collect data and post to page
    getData()
        .then(payload => {
            payload.name = pet.name;
            return petSnapShotApi.post(token, petId, payload);
        })
        .then(res => {
            console.log(res);
            console.log('upload good!');
        })
        .catch(err => console.error(err));
};

//setInterval(main, 7500);

var digitalAccelerometer = require('jsupm_mma7660');
// Instantiate an MMA7660 on I2C bus 0
var myDigitalAccelerometer = new digitalAccelerometer.MMA7660(
                    digitalAccelerometer.MMA7660_I2C_BUS,
                    digitalAccelerometer.MMA7660_DEFAULT_I2C_ADDR);
// place device in standby mode so we can write registers
myDigitalAccelerometer.setModeStandby();

// enable 64 samples per second
myDigitalAccelerometer.setSampleRate(digitalAccelerometer.MMA7660.AUTOSLEEP_64);

// place device into active mode
myDigitalAccelerometer.setModeActive();

var x, y, z;
x = digitalAccelerometer.new_intp();
y = digitalAccelerometer.new_intp();
z = digitalAccelerometer.new_intp();
var ax, ay, az;
ax = digitalAccelerometer.new_floatp();
ay = digitalAccelerometer.new_floatp();
az = digitalAccelerometer.new_floatp();

var outputStr;

var myInterval = setInterval(function() {
    myDigitalAccelerometer.getRawValues(x, y, z);
    outputStr = "Raw values: x = " + digitalAccelerometer.intp_value(x) +
    " y = " + digitalAccelerometer.intp_value(y) +
    " z = " + digitalAccelerometer.intp_value(z);
    console.log(outputStr);
    myDigitalAccelerometer.getAcceleration(ax, ay, az);
    outputStr = "Acceleration: x = "
        + roundNum(digitalAccelerometer.floatp_value(ax), 6)
        + "g y = " + roundNum(digitalAccelerometer.floatp_value(ay), 6)
        + "g z = " + roundNum(digitalAccelerometer.floatp_value(az), 6) + "g";
    console.log(outputStr);
}, 500);
// round off output to match C example, which has 6 decimal places
function roundNum(num, decimalPlaces) {
    var extraNum = (1 / (Math.pow(10, decimalPlaces) * 1000));
    return (Math.round((num + extraNum)
        * (Math.pow(10, decimalPlaces))) / Math.pow(10, decimalPlaces));
};
// When exiting: clear interval and print message
process.on('SIGINT', function() {
    clearInterval(myInterval);
    // clean up memory
    digitalAccelerometer.delete_intp(x);
    digitalAccelerometer.delete_intp(y);
    digitalAccelerometer.delete_intp(z);
    digitalAccelerometer.delete_floatp(ax);
    digitalAccelerometer.delete_floatp(ay);
    digitalAccelerometer.delete_floatp(az);
    myDigitalAccelerometer.setModeStandby();
    console.log("Exiting...");
    process.exit(0);
});