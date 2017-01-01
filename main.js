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
const testApi = require('./lib/test-api');
const convertTemp = require('./lib/convert-temp');


//parent for all grove sensors
const groveSensor = require('jsupm_grove');
const tempSensor = new groveSensor.GroveTemp(0);
let token = '';

// add any UPM requires that you need
// and the rest of your app goes here
// see the samples for more detailed examples

function main() {
  console.log(convertTemp(tempSensor.value()));  
};

setInterval(main, 2000);