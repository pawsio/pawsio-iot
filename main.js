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

setInterval(main, 7500);