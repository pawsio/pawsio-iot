module.exports = function vectorLength(x, y, z, comp) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) - Math.pow(comp, 2));
};  