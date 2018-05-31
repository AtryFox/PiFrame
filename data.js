const moment = require('moment');
const axios = require('axios');
const sensorDht = require('node-dht-sensor');

const config = require('./config/config.js');

moment.locale('de')


class Data {
	getDataSensors () {
		return new Promise(async (fulfill, reject) => {		
			fulfill({ 'dht': await this.getDataDht() });
		})
	}
	
	getDataGeneral() {
		return { 'now': moment() }
	}
	
	getDataDht() {
		return new Promise((fulfill, reject) => {
			sensorDht.read(11, 4, function(err, temperature, humidity) {
				if (!err) {
					fulfill({'temp' : temperature, 'humidity': humidity});
				}
			});
		})
	}
	
	getDataBackground() {
		return new Promise(async (fulfill, reject) => {
			let res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${config.api.nasa.key}`);
							

			fulfill(res.data);			
		});
	}
	
	getDataWeather() {
		return new Promise(async (fulfill, reject) => {
			let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${config.api.openweathermap.cityid}&units=metric&appid=${config.api.openweathermap.key}`);
							

			fulfill(res.data);			
		});
	}
}

module.exports = Data;