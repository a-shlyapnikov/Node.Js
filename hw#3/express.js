const express = require('express');
const counter = require('./counter.js');

const app = express();

app.get('/', (req, res) => {
    res.send(`<h1>Добро пожаловать на мой сайт!</h1>
    <p>Количество посещений: ${counter('index')} </p>
    <a href="/about">Go to about</a>`)

});

app.get('/about', (req, res) => {
    res.send(`<h1>Добро пожаловать About </h1>
    <p>Количество посещений: ${counter('about')}</p>
    <a href="/">Go to root</a>`);
});

app.use((req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
})

app.listen(3000, () => {
    console.log('server started on port 3000');
});