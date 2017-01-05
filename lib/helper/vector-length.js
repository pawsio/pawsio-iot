'use strict';

module.exports = function vectorLength(x, y, z, comp) {
    let finalCalc = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) - Math.pow(comp, 2));
    if(!finalCalc) return 0;
    return finalCalc;
};