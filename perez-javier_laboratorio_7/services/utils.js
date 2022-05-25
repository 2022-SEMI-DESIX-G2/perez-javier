const axios = require('axios');

const settings = {
    backendBaseUrl: 'https://pokeapi.co/api/v2'
}

const getFormattedBackendUrl = ({ query, searchType }) => `${settings.backendBaseUrl}/${searchType}/${query}`

const getSearch = ({ query, searchType = 'pokemon' }) => search({ url: getFormattedBackendUrl({ query, searchType }), searchType })

const search = async({ url, searchType }) => {
    // console.log(url);
    try {
        const { data, status } = await axios(url);
        if (status !== 200) throw new Error(`${searchType} not found`);
        return data;
    } catch (error) {
        throw error;
    }
}

const getEvolutionChain = async url => {
    let arrSearch = getArrSearch(url)

    let { evolution_chain } = await getSearch({ query: arrSearch[0], searchType: arrSearch[1] })
    arrSearch = getArrSearch(evolution_chain.url)

    let { chain } = await getSearch({ query: arrSearch[0], searchType: arrSearch[1] })

    return getArrEvolutionChain(chain);
}

const getArrSearch = url => url.split("/").slice(5, 7).reverse()

const getArrEvolutionChain = ({ species, is_baby, evolves_to }) => {
    let stack = [];
    stack.push({ name: species.name, is_baby: is_baby });

    while (evolves_to.length > 0) {
        if (evolves_to.length > 1) {
            evolves_to.forEach(({ species, is_baby }) => {
                stack.push({ name: species.name, is_baby: is_baby });
            });
        } else {
            stack.push({ name: evolves_to[0].species.name, is_baby: evolves_to[0].is_baby });
        }
        evolves_to = evolves_to[0].evolves_to
    }
    return stack;
}


module.exports = {
    getSearch,
    getEvolutionChain
}