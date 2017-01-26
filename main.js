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

const user = require('./lib/setup/userinfo');
const pet = require('./lib/setup/petinfo');

let token = '';
let petId = '';
let dataPayload = [];
let uploading = false;

let welcomeMessage = 'Pets IO!';
lcd(0,0, welcomeMessage);

function uploadData() {
    lcd(1,0,'data uploading');
    checkInternet().then(connected => {
        if(connected) {
            let name = pet.name;
            let payload = {dataPayload, name};
            uploading = true;
            return petSnapShotApi.post(token, petId, payload);
        } else throw { message: 'no internet connection' };   
    })
    .then(res => {
        dataPayload = [];
        uploading = false;
        lcd(1,0,'upload success');
        lcd(1,0, `id is ${res._id}`);
    })
    .catch(err => {
        uploading = false;
        console.error(err);
    });
};

function getToken() {
    lcd(1,0,'getting token');
    return userApi.signin(user)
            .then(res => { 
                lcd(1,0,'token received');
                token = res.token; 
            })
            .catch(err => console.error(err));
};

function getPetId() {
    lcd(1,0,'getting pet');
    let qstring = `?name=${pet.name}&owner=${user.username}&animal=${pet.animal}`;
    petsApi.getQstring(token, qstring)
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

function collectData() {
    lcd(1,0,'collecting data');
    return getData().then(payload => dataPayload.push(payload))
            .catch(err => console.error(err));
};

function main() {
    let rotarCurr = rotary();
    console.log(rotarCurr);
    if(rotarCurr < 0) {
        // if you have data to send, send it and then empty array
        if(dataPayload.length && !uploading) return uploadData();
        else return;
    };
    // check token
    if(!token) return getToken();
    console.log('token', token);
    // next check for the pets id
    if(!petId) return getPetId();
    console.log('petId', petId);
    // collect data and push to datPayload array
    return collectData();
};

setInterval(main, 2000);