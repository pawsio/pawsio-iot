module.exports = function rotarySetup() {
    const upm_grove = require('jsupm_grove');
    const groveRotary = new upm_grove.GroveRotary(1);
    
    return function getRotaryRel() {
        return groveRotary.rel_value();
    };
};

// var upm_grove = require('jsupm_grove');
// var groveRotary = new upm_grove.GroveRotary(1);

// loop();

// function loop() {
//     var abs = groveRotary.abs_value();
//     var absdeg = groveRotary.abs_deg();
//     var absrad = groveRotary.abs_rad();

//     var rel = groveRotary.rel_value();
//     var reldeg = groveRotary.rel_deg();
//     var relrad = groveRotary.rel_rad();

//     console.log('Abs: ' + abs + ' ' + Math.round(parseInt(absdeg)) + ' ' + absrad.toFixed(3));
//     console.log('Rel: ' + rel + ' ' + Math.round(parseInt(reldeg)) + ' ' + relrad.toFixed(3));

//    setTimeout(loop, 1000);
// }