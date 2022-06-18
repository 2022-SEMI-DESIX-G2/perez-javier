const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // Routes Paths
        this.paths = {
            pokemon: '/api/v1/pokemon',
        };

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.pokemon, require('../routes/pokemones'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}


module.exports = {
    Server
}