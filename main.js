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
const rotary = require('./lib/rotary')();

// TODO: I think for our purposes we assume user already signed up with our service

const user = require('./lib/setup/userinfo');
const pet = require('./lib/setup/petinfo');
let token = '';
let petId = '';
let dataPayload = [];

function main() {
    // if rotary is negative and no payload, short-circuit
    // if rotary is negative but have payload, check later whether we push
    if(rotary() < 0) {
      if(dataPayload.length) return console.log('hey data!');   
    } else {
        // check token
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
                console.log('from main', payload);
                // will need to do the check here
                // payload.name = pet.name;
                // return petSnapShotApi.post(token, petId, payload);
            })
            // .then(res => {
            //     console.log(res);
            //     console.log('upload good!');
            // })
            .catch(err => console.error(err));  
    };
};

setInterval(main, 2000);


// var x, y, z;
// x = digitalAccelerometer.new_intp();
// y = digitalAccelerometer.new_intp();
// z = digitalAccelerometer.new_intp();


// var outputStr;

// var myInterval = setInterval(function() {
//     myDigitalAccelerometer.getRawValues(x, y, z);
//     outputStr = "Raw values: x = " + digitalAccelerometer.intp_value(x) +
//     " y = " + digitalAccelerometer.intp_value(y) +
//     " z = " + digitalAccelerometer.intp_value(z);
//     console.log(outputStr);
//     myDigitalAccelerometer.getAcceleration(ax, ay, az);
//     outputStr = "Acceleration: x = "
//         + roundNum(digitalAccelerometer.floatp_value(ax), 6)
//         + "g y = " + roundNum(digitalAccelerometer.floatp_value(ay), 6)
//         + "g z = " + roundNum(digitalAccelerometer.floatp_value(az), 6) + "g";
//     console.log(outputStr);
// }, 500);
// // round off output to match C example, which has 6 decimal places



// var LCD = require('jsupm_i2clcd');
// var myLcd = new LCD.Jhd1313m1(3, 0x3E, 0x62);

//myLcd.setCursor(0,0);

// myLcd.setColor(107, 220, 247);
//myLcd.write('Hello from PawsIO!');
//myLcd.setCursor();

//let i = -2;
//function displayChange() {
//    myLcd.setCursor(0,i);
//    myLcd.write('Hello from PawsIO!');
//    
//    i--;
//    if(i === -4) {
//        i = -2;
//    }
//}
// myLcd.setCursor(0,0);
// myLcd.write('Hello from PawsIO!');
// myLcd.write('ello from PawsIO!');

//setInterval(displayChange, 1000);