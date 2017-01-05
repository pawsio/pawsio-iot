module.exports = function rotarySetup() {
    const upm_grove = require('jsupm_grove');
    const groveRotary = new upm_grove.GroveRotary(1);
    
    return function getRotaryRel() {
        return groveRotary.rel_value();
    };
};
