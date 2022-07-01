const { Schema, model } = require('mongoose');

const PokemonSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    abilities: {
        type: String,
        required: [true, 'abilities is required']
    },
    id: {
        type: Number,
        unique: true,
        required: [true, 'pokemon id is required']
    },
    sprites: {
        type: String,
        required: true
    },
    locationAreas: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    stats: {
        type: Array,
        required: true,
    },
    types: {
        type: Array,
        required: true,
    },
    evosChain: {
        type: String,
        required: true
    },
    cachedAt: {
        type: Date,
        required: true,
    },
    frontDefaultSprite: {
        type: String,
        required: true
    }
});



module.exports = model('Pokemon', PokemonSchema);