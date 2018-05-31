moment.locale('de');

let lastBgUpdate = 0;

$(document).ready(() => {
	$('html').css('font-size', '16px');
	
	refreshData();	
	setInterval(refreshData, 15 * 1000);
});

async function refreshData() {
	await $('#footer-left').fadeIn();
		
	const now = Date.now();
	
	let promises = [
		$.get('/api/general', (res) => {
			$('#general-date').html(moment(res.now).format("LL"));
			$('#general-time').html(moment(res.now).format("LT"));
		}),
		$.get('/api/sensors', (res) => {	
			$('#dht-temperature').html(res.dht.temp.toFixed(0));
			$('#dht-humidity').html(res.dht.humidity.toFixed(0));
		}),
		$.get('/api/weather', (res) => {
			$('#owm-city').html(res.name);
			$('#owm-temperature').html(res.main.temp.toFixed(0));
			$('#owm-humidity').html(res.main.humidity.toFixed(0));
		})
	];
			
	if(now - lastBgUpdate >= 1000 * 60 * 5) {
		promises.push($.get('/api/background', (res) => {			
			let img = new Image() 
			img.src = res.url;
			
			img.onload = () => {
				lastBgUpdate = now;
				$('#wallpaper-lastupdate').html(lastBgUpdate);
				$('#wallpaper-url').html(res.url);
				$('#wallpaper-title').html(res.title);
				$('#wallpaper-author').html(res.author);
				
				$('#background').prepend(`<div style="background-image: url('${res.url}')"></div>`)
				
				if($('#background').children().length > 1) {
					$('#background > div:not(:first-child)').each((index, obj) => {
						$(obj).fadeOut(2500, () => { $(obj).remove() });
					});
				}
			}
		}));
	}
	
	await Promise.all(promises);
			
	/*if(now - lastBgUpdate >= 1000 * 60 * 2) {
		$.get('/api/background', (res) => {
			lastBgUpdate = now;
			$('#wallpaper-lastupdate').html(lastBgUpdate);
			$('#wallpaper-url').html(res.hdurl);
			$('#wallpaper-title').html(res.title);
			
			$('#body').css('background-image', `url("${res.hdurl}")`);
			doneApis++;
		});
	}*/
	
	
	await $('#footer-left').fadeOut();
}