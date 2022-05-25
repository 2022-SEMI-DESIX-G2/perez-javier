const express = require('express');
const app = express();

const fibonacci = (n, s = []) => n < 2 ? n : (s[n - 1]) + (s[n - 2])

const getFibonacciSeries = (req, res) => {

    const { num } = req.params
    let serie = [];

    for (let i = 0; i < num; i++) {

        serie.push(fibonacci(i, serie));
    }

    res.json({ serie });
}

app.get('/fibonacci/:num', getFibonacciSeries);

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000...'));