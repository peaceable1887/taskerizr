/**
 * Zeigt einen Kalender und darunter eine Tabelle mit 
 * den zeitlich zugehörigen Aufgaben(Tasks)
 * Lädt bei Aufruf prevDays, Monatstage und nextDays
 * 
 * @copyright Gruppe 15
 * @author Tom Gibson
 */

//variablen
let now = new Date();
let dayNumbers = document.querySelector(".dayNumbers");

/**
 * Laden der Kalender Struktur
 */
function renderCal() {
    now.setDate(1); //erster Tag des Monats
    let monthDays = document.getElementsByClassName("day");
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    let firstDayIndex = now.getDay();
    let lastDayIndex = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDay();
    const prevDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    const nextDays = 7 - lastDayIndex;
    let table = document.querySelector('.task-table');
    removeAllRowsFromCalTable(table);
    //Montag anfang der Woche
    if (firstDayIndex == 0) {
        firstDayIndex = 7;
    }

    //prevTage überschreiben
    for (let p = firstDayIndex; p > 1; p--) {
        let liContent = document.createTextNode(prevDays + 2 - p);
        let liElement = document.createElement('li');
        liElement.classList.add("prev-days");
        liElement.appendChild(liContent);
        dayNumbers.appendChild(liElement);
    }

    //Monatstage überschreiben
    for (let i = 1; i <= lastDay; i++) {

        let liContent = document.createTextNode(i);
        let liElement = document.createElement('li');
        liElement.classList.add("day");
        if (now.getMonth() !== new Date().getMonth() && i === 1) {
            liElement.classList.add('active');
        }
        else if (i == new Date().getDate()
            && now.getMonth() == new Date().getMonth()
            && now.getFullYear() == new Date().getFullYear()) {
            liElement.classList.add("active");
            loadCalTableTasks(i);
        }
        liElement.appendChild(liContent);
        dayNumbers.appendChild(liElement);
    }

    //nextTage überschreiben
    for (let p = 1; p <= nextDays; p++) {
        let liContent = document.createTextNode(p);
        let liElement = document.createElement('li');
        liElement.classList.add("next-days");
        liElement.appendChild(liContent);
        dayNumbers.appendChild(liElement);
    }

    // Markiert den Tag, welchen man geklickt hat
    for (var i = 0; i < monthDays.length; i++) {
        
        monthDays[i].addEventListener("click", function () {
            var current = document.querySelector(".active");
            current.className = current.className.replace(" active", "");
            this.className += " active";
            current = document.querySelector(".active"); // update day
            //Tasklist 
            removeAllRowsFromCalTable(table);
            loadCalTableTasks(current.innerHTML);
        });
    }
}

//variablen
const currentMonthLabel = document.querySelector(".month");
let options = { month: "long", year: "numeric" };
const prevbtn = document.querySelector(".prev");
const nextbtn = document.querySelector(".next");
const todaybtn = document.getElementById("todaybtn");

// Anzeigeoption des Monatsnamen
currentMonthLabel.innerHTML = now.toLocaleDateString("de-DE", options);

/**
 * Linker Button, um einen Monat zurück zu klicken
 * Löscht Inhalt mit removeContent() und lädt mit renderCal() neu
 */
prevbtn.addEventListener("click", function () {
    now.setMonth(now.getMonth() - 1);
    refreshCal();
})

/**
 * Rechter Button, um einen Monat weiter zu klicken
 * Löscht Inhalt mit removeContent() und lädt mit renderCal() neu
 */
nextbtn.addEventListener("click", function () {
    now.setMonth(now.getMonth() + 1);
    refreshCal();
})

/**
 * Heute Button, bringt den Kalender auf den aktuellen Monat
 */
todaybtn.addEventListener("click", function () {
    let today = new Date();
    now.setMonth(today.getMonth());
    now.setFullYear(today.getFullYear());
    refreshCal();
})

/**
 * Entfernt alle first ChildNodes bis keine mehr da sind. 
 */
function removeContent() {
    while (dayNumbers.firstChild) {
        dayNumbers.removeChild(dayNumbers.firstChild);
    }
}

/**
 * Lädt den Kalender neu
 */
function refreshCal() {
    currentMonthLabel.innerHTML = now.toLocaleDateString("de-DE", options);
    removeContent();
    renderCal();
}

/**
 * Lädt alle tagesabhänigen Tasks in einer Tabelle
 */
function loadCalTableTasks(day) {
    let compareOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
    now.setDate(day);
    let timeFormat = now.toLocaleDateString("de-DE", compareOptions);
    loadTasksTableByTime(timeFormat); //wird in taskViewController.js erstellt
}

// Erstes Laden der Kalender seite
window.addEventListener('load', () => {
    renderCal();
});