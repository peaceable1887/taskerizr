/**
 * Erstellt eine Uhr gibt diese sekündlich aus
 * 
 * @copyright Gruppe 15
 * @author Tom Gibson
 */

let speed = 1000 // refesh interval in millisekunden

function updateClock() {
	let now = new Date();
    let timeElement = document.getElementsByTagName("Time");
    timeElement[0].innerHTML = now.toLocaleTimeString("de-DE");
}
// Intervall setzen
setInterval(updateClock, speed);

// Laden der Seite
window.addEventListener("load", updateClock);