var speed = 1000 // refesh interval in milliseconds

function updateClock() {
	var now = new Date();
	var paragraph = document.getElementById('uhrzeit');
	paragraph.innerHTML = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
}

var timer = setInterval(updateClock, speed)
