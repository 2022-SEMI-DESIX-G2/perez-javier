const Main = require('./services/main');

const query = 'eevee'.toLowerCase();
const searchType = 'pokemon'.toLowerCase();

Main.init({ query, searchType });