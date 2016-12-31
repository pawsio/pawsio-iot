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


var mraa = require('mraa');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var xmlHttp = new XMLHttpRequest();
var url = 'https://pawsio.herokuapp.com/api/tests';

// add any UPM requires that you need
// and the rest of your app goes here
// see the samples for more detailed examples

// console.log(mraa) ;     // prints mraa object to XDK IoT debug output panel

console.log('hi');

xmlHttp.onreadystatechange = () => {//Call a function when the state changes.
    if(xmlHttp.readyState === 4) {
        console.log(xmlHttp.responseText);
        console.log('GET Success!!');
    } else {
        console.log('GET Failed. Http status: ' + xmlHttp.status);
    };
};

xmlHttp.open('GET', url, true);
xmlHttp.send(null);
//Send the proper header information along with the request
//http.setRequestHeader('Content-Type', 'application/json');