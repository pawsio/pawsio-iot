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

'use strict' ;

const mraa = require('mraa');
const testApi = require('./lib/api/test-api');
const userApi = require('./lib/api/users-api');
const petsApi = require('./lib/api/pets-api');
const convertTemp = require('./lib/helper/convert-temp');

// TODO: I think for our purposes we assume user already signed up with our service

const user = require('./lib/setup/userinfo');
const pet = require('./lib/setup/petinfo');
let token = '';

//parent for all grove sensors
const groveSensor = require('jsupm_grove');
const tempSensor = new groveSensor.GroveTemp(0);

// add any UPM requires that you need
// and the rest of your app goes here
// see the samples for more detailed examples

function main() {
    // first check token
    if(!token) userApi.signin(user).then(res => { token = res.token; });
    else {
        //check if pet belongs to owner if not add him
        petsApi.getAll(token)
            .then(res => {
                let petIndex = -1;
            
                res.pets.forEach((element, index) => {
                    if (element.name === pet.name) petIndex = index;
                });

                if (petIndex !== -1) return 'pet exists';
                else return petsApi.addPet(token, pet);
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));
    };

    console.log(convertTemp(tempSensor.value()));  
};

setInterval(main, 7500);