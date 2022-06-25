const setSprites = (sprites) => {
    delete sprites.other;
    delete sprites.versions;
    let spritesValid = Object.values(sprites).filter(sprite => sprite != null);

    return spritesValid.reverse();
}

module.exports = {
    setSprites,
}