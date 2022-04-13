/**
 * Begrüßt den Viewer je nach Tagesform Morgen, Mittag oder Abend und was heute Fällig ist
 * @copyright Gruppe 15
 * @author Tom Gibson
 */

 /**
 * Zeit aufrufen
 */
function getTime() {
    let d = new Date();
    let hour = d.getHours();
    // hour = 0;
    setWelcomeText(hour);
}

/**
 * Prüft welche Anrede zeitlich passend ist
 */
function setWelcomeText(hour) {
    let timeOption = document.querySelector(".heading1");
    if(hour <= 5) {
        timeOption.innerHTML = "Gute Nacht";
    } else if (hour < 10) {
        timeOption.innerHTML = "Guten Morgen";
    } else if (hour < 12) {
        timeOption.innerHTML = "Guten Vormittag";
    } else if (hour < 15) {
        timeOption.innerHTML = "Guten Mittag";
    } else if (hour < 18) {
        timeOption.innerHTML = "Guten Nachmittag";
    } else if (hour < 24) {
        timeOption.innerHTML = "Guten Abend";
    } else {
        timeOption.innerHTML = "Willkommen";
    }
}

// Heute Fällig
function getTaskTable() {
    let now = new Date();
    let options = {day: "2-digit", month: "2-digit", year: "numeric"};
    let today = now.toLocaleDateString("de-DE", options);
    loadTasksTableByTime(today);
}

// Laden der Seite
window.addEventListener('load', () => {
    getTime();
    getTaskTable();
});

