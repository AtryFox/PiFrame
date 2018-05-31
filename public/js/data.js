let lastBgUpdate = 0;

$(document).ready(() => {
	refreshData();
});

function refreshData() {
	const now = Date.now();
	
	$.get('/api/sensors', (res) => {
		$('#general-lastupdate').html(res.general.lastupdate);
		
		$('#dht-temperature').html(res.dht.temp.toFixed(0));
		$('#dht-humidity').html(res.dht.humidity.toFixed(0));
	});
	
	$.get('/api/weather', (res) => {
		$('#owm-city').html(res.name);
		$('#owm-temperature').html(res.main.temp.toFixed(0));
		$('#owm-humidity').html(res.main.humidity.toFixed(0));
	});
	
	if(now - lastBgUpdate >= 1000 * 60) {
		$.get('/api/background', (res) => {
			lastBgUpdate = now;
			$('#wallpaper-lastupdate').html(lastBgUpdate);
			$('#wallpaper-url').html(res.hdurl);
			
			$('#body').css('background-image', `url("${res.hdurl}")`);
		});
	}
}