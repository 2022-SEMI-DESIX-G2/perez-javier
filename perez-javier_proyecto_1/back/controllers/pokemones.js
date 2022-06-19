const { request, response } = require("express");
const axios = require("axios").default;


const CACHE = {};
let delta = 10 * 1000;

const getCache = async(req = request, res = response) => {
    res.json({ data: CACHE })
}

const getPokemon = async(req = request, res = response) => {

    const { name } = req.params;
    const now = new Date();

    if (CACHE[name]) {
        const { cachedAt } = CACHE[name]
        if ((now - cachedAt >= delta)) {
            delete CACHE[name];
        } else {
            return res.json({ data: CACHE[name], isCached: true });
        }
    }
    let responseData, cachedAt;
    try {
        const { data } = await axios.get(
            `${process.env.BASE_URL}/pokemon/${name}`
        );
        const { id } = data
        const [location, species] = await Promise.all([
            axios.get(`${process.env.BASE_URL}/pokemon/${id}/encounters`),
            axios.get(`${process.env.BASE_URL}/pokemon-species/${id}/`),
        ]);

        const { evolution_chain } = species.data;
        const responseEvosChain = await axios.get(evolution_chain.url);
        const { chain } = responseEvosChain.data;
        data['evos_chain'] = getArrEvolutionChain(chain);
        data['locations_areas'] = location.data;
        responseData = data;

        // creando fecha de exp para el cacheo
        const month = setMonth(now.getMonth() + 1);
        const dateExp = new Date(`${month} ${now.getDate()} ${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
        cachedAt = dateExp;

    } catch (error) {
        console.log(error);
        responseData = { error: error.toString(), name };
    }
    CACHE[name] = { responseData, cachedAt };
    res.json({ data: responseData, cachedAt, isCached: false });
}

const setMonth = (m) => {
    switch (m) {
        case 1:
            return 'january'
            break;
        case 2:
            return 'february'
            break;
        case 3:
            return 'march'
            break;
        case 4:
            return 'april'
            break;
        case 5:
            return 'may'
            break;
        case 6:
            return 'june'
            break;
        case 7:
            return 'july'
            break;
        case 8:
            return 'august'
            break;
        case 9:
            return 'september'
            break;
        case 10:
            return 'october'
            break;
        case 11:
            return 'november'
            break;
        case 12:
            return 'december'
            break;
    }
}

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
    getPokemon,
    getCache,
}