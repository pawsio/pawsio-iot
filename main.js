/*
 * Paws IO Node.js starter app.
 *
 * This code based on a Node.js template provided by Intel XDK and
 * can be used on any Node.js supported IoT board.
 * It is helpful if the board includes
 * support for I/O access via the MRAA and UPM libraries.
 *
 * https://software.intel.com/en-us/xdk/docs/lp-xdk-iot
 */


// keep /*jslint and /*jshint lines for proper jshinting and jslinting
// see http://www.jslint.com/help.html and http://jshint.com/docs
/* jslint node:true */
/* jshint unused:true */

'use strict';

const mraa = require('mraa'); // eslint-disable-line
const userApi = require('./lib/api/users-api');
const petsApi = require('./lib/api/pets-api');
const petSnapShotApi = require('./lib/api/pet-snapshots-api');
const checkInternet = require('./lib/helper/check-internet');
const getData = require('./lib/get-data')();
const rotary = require('./lib/rotary')();
const lcd = require('./lib/lcd')();

// TODO: I think for our purposes we assume user already signed up with our service

const user = require('./lib/setup/userinfo');
const pet = require('./lib/setup/petinfo');
let welcomeMessage = 'Pets IO!';
lcd(0,0, welcomeMessage);

let token = '';
let petId = '';
let dataPayload = [];
let uploading = false;

function main() {
    // if rotary is negative and no payload, short-circuit
    // if rotary is negative but have payload, check later whether we push
    let rotarCurr = rotary();
    console.log(rotarCurr);

    // split the logic into functions and make the conditional workflow obvious
    if(rotarCurr < 0) {
        // if you have data to send, send it and then empty array
        if(dataPayload.length && !uploading) {
            lcd(1,0,'data uploading');
            return checkInternet()
                .then(connected => {
                    if(connected) {
                        let payload = {dataPayload, name: pet.name};
                        uploading = true;
                        return petSnapShotApi
                                .post(token, petId, payload);
                    } else {
                        throw { message: 'no internet connection' };   
                    };
                })
                .then(() => {
                    dataPayload = [];
                    uploading = false;
                    lcd(1,0,'upload success');
                    console.log('upload success');
                })
                .catch(err => {
                    uploading = false;
                    console.error(err);
                });
        };
    } else {
        // check token
        if(!token) {
            lcd(1,0,'getting token');
            return userApi.signin(user)
                        .then(res => { 
                            lcd(1,0,'token received');
                            token = res.token; 
                        })
                        .catch(err => console.error(err));
        };
        console.log('token', token);
        // next check for the pets id
        if(!petId) {
            let qstring = `?name=${pet.name}&owner=${user.username}&animal=${pet.animal}`;
            lcd(1,0,'getting pet');
            return petsApi.getQstring(token, qstring)
                        .then(res => {
                            if (res.length === 0) {
                                lcd(1,0,'pet found');
                                return petsApi.addPet(token, pet);
                            } else { 
                                petId = res[0]._id;
                            };
                        })
                        .catch(err => console.error(err));
        };
        console.log('petId', petId);
        // collect data and push to datPayload array
        return getData()
            .then(payload => {
                lcd(1,0,'collecting data');
                console.log('payload', payload);
                dataPayload.push(payload);
            })
            .catch(err => console.error(err));
    };
};

setInterval(main, 2000);

