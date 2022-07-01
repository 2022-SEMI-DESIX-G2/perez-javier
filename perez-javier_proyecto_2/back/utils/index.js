const evolutionChain = require('./evolution-chain');
const locationAreas = require('./location-areas');
const sprites = require('./sprites');
const abilities = require('./abilities');

module.exports = {
    ...evolutionChain,
    ...locationAreas,
    ...sprites,
    ...abilities,
}