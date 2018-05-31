const moment = require('moment');
const axios = require('axios');
const sensorDht = require('node-dht-sensor');

const config = require('./config/config.js');

moment.locale('de')


class Data {
	getDataAll () {
		return new Promise(async (fulfill, reject) => {		
			fulfill({ 'general': this.getDataGeneral(),
						'dht': await this.getDataDht() });
		})
	}
	
	getDataGeneral() {
		return { 'lastupdate': moment().format('LLL') }
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
	
	getNewBackground() {
		return new Promise(async (fulfill, reject) => {
			let res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${config.api.nasa.key}`);
							

			fulfill({'url': res.data.hdurl});			
		});
	}
}

module.exports = Data;