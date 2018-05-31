moment.locale('de');

let lastBgUpdate = 0;

$(document).ready(() => {
	$('html').css('font-size', '16px');
	
	refreshData();	
	setInterval(refreshData, 15 * 60);
});

function refreshData() {
	console.log("Refreshing data...")
	
	const now = Date.now();
	
	$.get('/api/general', (res) => {
		$('#general-date').html(moment(res.now).format("LL"));
		$('#general-time').html(moment(res.now).format("LT"));
	});
	
	$.get('/api/sensors', (res) => {	
		$('#dht-temperature').html(res.dht.temp.toFixed(0));
		$('#dht-humidity').html(res.dht.humidity.toFixed(0));
	});
	
	$.get('/api/weather', (res) => {
		$('#owm-city').html(res.name);
		$('#owm-temperature').html(res.main.temp.toFixed(0));
		$('#owm-humidity').html(res.main.humidity.toFixed(0));
	});
	
	if(now - lastBgUpdate >= 1000 * 60 * 2) {
		$.get('/api/background', (res) => {
			lastBgUpdate = now;
			$('#wallpaper-lastupdate').html(lastBgUpdate);
			$('#wallpaper-url').html(res.hdurl);
			$('#wallpaper-title').html(res.title);
			
			$('#body').css('background-image', `url("${res.hdurl}")`);
		});
	}
}