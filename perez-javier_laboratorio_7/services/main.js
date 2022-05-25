const Utils = require('./utils');
const jsonResponses = require('./jsonResponses');

const init = ({ query, searchType }) => {
    finder({ query, searchType });
    // console.log({ query, searchType });
}

const finder = async({ query, searchType }) => {
    try {
        const response = await Utils.getSearch({ query, searchType });
        const { species } = response;
        if (species) response['chain_evolves'] = await Utils.getEvolutionChain(species.url);
        // console.log(response);
        const jsonResponse = jsonResponses.jsonResponse({ searchType, response });
        console.log(jsonResponse);
        // return jsonResponse;
        // console.log(evolvesList);
    } catch (error) {
        console.error({ error });
    }
}

module.exports = {
    init,
}