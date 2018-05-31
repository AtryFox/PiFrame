PiFrame
=======

Google Chromecast-like picture frame displaying data from different sensors.

Tested on Raspberry Pi 2 Model B, but it should run on any hardware with the Broadcom BCM 2835 chip for GPIO communication.

## Preview ##
<img src="https://raw.githubusercontent.com/DerAtrox/PiFrame/76f606a121f7226ca79951fa8f2dd94e533a014a/preview.png">


##Requirements##
- Node.js 8 or higher
- Node.js module [PM2](http://pm2.keymetrics.io/)
- [BCM2835](http://www.airspayce.com/mikem/bcm2835/) library


##Preparing##
Clone this repository on your Pi:
```bash
git clone https://github.com/DerAtrox/PiFrame.git
```

Make `run.sh` executable:
```bash
chmod +x ./run.sh
```


##Configuring##
Copy `/config/default-config.js` to `/config/config.js`.

###Properties###
|Property                   |Default    |Description
|---------------------------|-----------|------------------------------------
|port                       |3000       |Port used by the web server
|sensor.dht.gpio            |4          |[GPIO pin](https://www.raspberrypi.org/documentation/usage/gpio/) used by the DHT sensor
|sensor.dht.type            |11         |Wether you use a DHT11 (put in `11`) or a DHT22/AM2302 (put in `22`
|api.nasa.key               |*empty*    |Your NASA API key ([get one here](https://api.nasa.gov/)) (*unused*)
|api.unsplash               |*empty*    |Your Unsplash API key ([get one here](https://unsplash.com/developers)) (Free demo app: 50 requests per hour)
|api.openweathermap.key     |*empty*    |Your OpenWeatherMap API key ([get one here](https://openweathermap.org/appid))
|api.openweathermap.cityid  |*empty*    |City ID of the city you want to display ([City ID list](http://openweathermap.org/help/city_list.txt))


##Running and updating

Run `run.sh` to start and daemonize PiFrame with PM2.
```bash
./run.sh
```

After that you can use PM2 to start, stop, restart or monitor PiFrame.

Now you can just open your browser and navigate to your Pi with the port you chose, for example `http://raspberry:3000/`.

To update PiFrame, just run the start script (`run.sh`) again.

**Note**: Running the start script will reset everything in the directory, except Node.js modules and configuration files, to the last commit in this repository#master.


##Views and API##
###Views##
PiFrame comes with two views, one fancy view you can reach with `/` and one debugging view just showing some information, which you can reach with `/simple`.

More views or themes are planned in the future.

###API###
PiFrame uses a API to refresh the information shown on your screen every few seconds. You can use these API endpoints for other projects if you want.

At the moment, there are the following API **GET** endpoints:
- `/api/general`
- `/api/sensors`
- `/api/weather`
- `/api/background`


##Libraries, Frameworks, Fonts and APIs##
This project is made possible by these awesome libraries, frameworks, fonts and APIs, go check them out!

- [Node.js](https://nodejs.org/) - Node.js JavaScript runtime
- [PM2](https://pm2.keymetrics.io/) - Node.js Production Process Manager with a built-in Load Balancer


- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [Express](http://expressjs.com/de/) - Fast, unopinionated, minimalist web framework for node
- [Moment.js](https://momentjs.com/) - Parse, validate, manipulate, and display dates in javascript
- [bcm2835 library](http://www.airspayce.com/mikem/bcm2835/) - C library for Broadcom BCM 2835 as used in Raspberry Pi
- [node-dht-sensor](https://github.com/momenso/node-dht-sensor) - Node.js Humidity and Temperature sensor addon
- [Bootstrap](https://getbootstrap.com/) - The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web
- [jQuery](https://jquery.com/) - jQuery JavaScript Library


- [Font Awesome](https://fontawesome.com/) - The iconic SVG, font, and CSS toolkit
- [Google Fonts](https://fonts.google.com/) - Making the web more beautiful, fast, and open through great typography


- [OpenWeatherMap](https://openweathermap.org/) - Free weather data
- [Unsplash](https://unsplash.com/) - Beautiful, free photos
- [NASA APIs](https://api.nasa.gov/) - Awesome pictures of our universe