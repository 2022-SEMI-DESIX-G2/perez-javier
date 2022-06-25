const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // Routes Paths
        this.paths = {
            pokemon: '/api/v1/pokemon',
        };

        // Connect DB
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Routes App
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Read and Paser body
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