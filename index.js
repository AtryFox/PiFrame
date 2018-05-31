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

app.get('/api/general', async function (req, res) {
	res.json(await data.getDataGeneral());
});

app.get('/api/sensors', async function (req, res) {
	res.json(await data.getDataSensors());
});

app.get('/api/background', async function (req, res) {
	res.json(await data.getDataBackground());
});

app.get('/api/weather', async function (req, res) {
	res.json(await data.getDataWeather());
});

app.use(express.static('public'))

app.listen(config.port, function () {
  console.log('PiFrame listening on port 3000!');
});
