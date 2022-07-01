const { request, response } = require("express");
const axios = require("axios").default;

const Pokemon = require("../models/pokemon");

const { setEvoChain, setLocationAreas, setSprites, setAbilities } = require('../utils')

// const CACHE = {};
let delta = 10 * 1000;

const getCache = async(req = request, res = response) => {
    try {
        const [total, CACHE] = await Promise.all([
            Pokemon.count(),
            Pokemon.find()
        ])
        res.json({ total, data: CACHE })
    } catch (error) {
        console.log(error);
        res.status(500).json({ data: error.toString() });
    }
}

const getPokemon = async(req = request, res = response) => {
    const { name } = req.params;
    const now = new Date();

    const pokemonDB = await Pokemon.findOne({ name });
    if (pokemonDB) {
        const { cachedAt } = pokemonDB
        if ((now - cachedAt >= delta)) {
            await Pokemon.findOneAndDelete({ name })
        } else {
            return res.json({ data: pokemonDB, isCached: true });
        }
    }

    try {
        const { data } = await axios.get(
            `${process.env.BASE_URL}/pokemon/${name}`
        );
        const { id, sprites, abilities } = data
        const [location, species] = await Promise.all([
            axios.get(`${process.env.BASE_URL}/pokemon/${id}/encounters`),
            axios.get(`${process.env.BASE_URL}/pokemon-species/${id}/`),
        ]);
        data.evosChain = await setEvoChain(species.data);
        data.locationAreas = setLocationAreas(location.data) || '<tr><td>No Existen lugares</td><tr>';
        data.sprites = setSprites(sprites);
        data.abilities = setAbilities(abilities);
        data.frontDefaultSprite = sprites.front_default;
        // Creating date cached exp
        const month = setMonth(now.getMonth() + 1);
        data.cachedAt = new Date(`${month} ${now.getDate()} ${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);

        const pokemon = new Pokemon(data);
        await pokemon.save();
        res.status(201).json({ data: pokemon, isCached: false });

    } catch (error) {
        console.log(error);
        res.status(400).json({ data: error.toString(), name });
        // responseData = {  };
    }
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

module.exports = {
    getPokemon,
    getCache,
}