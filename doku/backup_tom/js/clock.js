var speed = 1000 // refesh interval in milliseconds

function updateClock() {
	var now = new Date();
    var paragraph = document.getElementById("time");
    if(now.getHours()<10){
        paragraph.innerHTML = "0" + now.getHours() + ":" + now.getMinutes();
    } else {
        paragraph.innerHTML = now.getHours() + ":" + now.getMinutes();
    }
}

var timer = setInterval(updateClock, speed);
