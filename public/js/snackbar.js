/**
 * Diese Funktion kann in der gesamten Anwendung zur Anzeige von Statusmeldungen,
 * welche im unteren rechten Bereich kurz eingeblendet werden, benutzt werden. 
 * Der angegebene Snacktype entscheidet über das Erscheinungsbild der Statusmeldung.
 * 
 * @param {string} message Nachricht welche angezeigt werden soll
 * @param {snackType} snackType Typ der Anzeige
 */
function Snackbar(message, snackType) {
    let bgColor, fgColor, icon, snack

    switch (snackType) {
        case snackTypes.SUCCESS:
            bgColor = "green"
            icon = "images//iconmonstr-check-mark-5-16.png"
            break;
        case snackTypes.ERROR:
            bgColor = "red"
            break;
        case snackTypes.INFORMATION:
            bgColor = "white"
            break;
        case snackTypes.IMPORTANT:
            bgColor = "yellow"
            break;
        default:
            bgColor = "#333";
            break;
    }

    snack = document.getElementById("snackbar");
    snackIcon = document.querySelector("#snackbar img");
    snackText = document.querySelector("#snackbar p");
    snack.style.backgroundColor = bgColor;
    snackIcon.src = icon;
    snackText.innerHTML = message;
    
    let show = function () {
        snack.className = "show";
        setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 3000);
    }

    return {
        showSnack: show
    }
}

/**
 * Typen des Snacks
 */
const snackTypes = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFORMATION: 'information',
    IMPORTANT: 'important'
}