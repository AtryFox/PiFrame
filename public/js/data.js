let lastBgUpdate = 0;

$(document).ready(() => {
	refreshData();
});

function refreshData() {
	const now = Date.now();
	
	$.get('/data', (res) => {
		$('#general-lastupdate').html(res.general.lastupdate);
		
		$('#dht-temperature').html(res.dht.temp);
		$('#dht-humidity').html(res.dht.humidity);
	});
	
	if(now - lastBgUpdate >= 1000 * 60) {
		$.get('/background', (res) => {
			lastBgUpdate = now;
			$('#wallpaper-lastupdate').html(lastBgUpdate);
			$('#wallpaper-url').html(res.url);
			
			$('#body').css('background-image', `url("${res.url}")`);
		});
	}
}