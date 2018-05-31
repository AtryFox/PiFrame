const express = require('express');
const app = express();

const Data = require('./data.js');
const data = new Data();

const config = require('./config/config.js');

const port = 3000;

app.get('/', async function (req, res) {
	res.set('Content-Type', 'text/html');
	res.sendFile(__dirname + '/views/main.html');
});

app.get('/simple', async function (req, res) {
	res.set('Content-Type', 'text/html');
	res.sendFile(__dirname + '/views/simple.html');
});

app.get('/data', async function (req, res) {
	res.json(await data.getDataAll());
});

app.get('/background', async function (req, res) {
	res.json(await data.getNewBackground());
});

app.use(express.static('public'))

app.listen(config.port, function () {
  console.log('Example app listening on port 3000!');
});
