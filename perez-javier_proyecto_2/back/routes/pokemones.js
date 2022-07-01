const { Router } = require('express');

const { getPokemon, getCache } = require('../controllers/pokemones');


const router = Router();

router.get("/cache", getCache);

router.post("/:name", getPokemon);

module.exports = router;