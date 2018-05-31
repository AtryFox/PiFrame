const config = {
	'port': 3000,
	'sensor': {
		'dht': {
			// GPIO pin number https://www.raspberrypi.org/documentation/usage/gpio/
			// Type 11 for DHT11, type 22 for DHT22 or AM2302
			'gpio': 4,
			'type': 11
		}
	},
	'api': {
		'nasa': {
			// Get your free API key at https://api.nasa.gov/
			'key': ''
		},
		'openweathermap': {
			// Get your free API key at https://openweathermap.org/
			// Get your city ID at http://openweathermap.org/help/city_list.txt
			'key': '',
			'cityid': ''
		}
	}
}

module.exports = config;