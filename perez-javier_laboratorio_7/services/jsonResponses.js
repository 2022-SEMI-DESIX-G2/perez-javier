const jsonResponse = ({ searchType, response }) => {
    const jsonMap = {
        ability: abilityResponse,
        pokemon: pokemonResponse,
    };

    return jsonMap[searchType] ? jsonMap[searchType](response) : errorMsg();
}
const errorMsg = () => `There was an error`
const pokemonResponse = ({ id, name, weight, height, sprites, abilities, chain_evolves }) => {
    const { back_default, front_default } = sprites;
    let abilitiesList = []
    abilities.map(({ ability, is_hidden }) => {
        abilitiesList.push({ name: ability.name, is_hidden })
    });

    let evolvesList = []
    chain_evolves.map(({ name, is_baby }) => {
        evolvesList.push({ name, is_baby });
    });

    // console.log({ back_default, front_default });
    // console.log({ abilitiesList });

    return JSON.stringify(data = {
        id,
        name,
        weight,
        height,
        sprites: {
            back_default,
            front_default
        },
        abilitiesList,
        evolvesList
    });
}

const abilityResponse = ({ name, pokemon }) => {
    const pokemonList = [];
    pokemon.map(({ pokemon, is_hidden }) => pokemonList.push({ pokemon: pokemon.name, is_hidden }));
    return JSON.stringify({
        name,
        pokemonList
    });
}

module.exports = {
    jsonResponse,
}