const setSprites = (sprites) => {
    delete sprites.other;
    delete sprites.versions;
    let spritesValid = Object.values(sprites).filter(sprite => sprite != null).reverse();
    return spritesValid.map(sprite => `<img class="sprites" src='${sprite}'>` ).join('');
}

module.exports = {
    setSprites,
}