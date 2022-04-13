/**
 * Gruppe-15 
 * @author Marc Fischer
 * 
 * SettingsController beeinhaltet methoden zum Speichern/Updaten und zum Laden von Einstellungen.
 * Das Object wurde so erstellt, das die einzelnen Methoden von mehreren Seiten aus aufgerufen werden
 * können.
 */
let SettingsController = function () {

    const setIconForTheme = (theme) => {
        let iconImg = document.querySelector("#time-area img");

        iconImg.src = (theme == "dark-theme") ? "images/moon.png" : "images/icon-clouds.png"; 
    }

    
    /**
     * 
     * Die Methode loadSettings holt die Settings aus der Datenbank. Anschließend wird 
     * das Theme dem Body zugeordnet.
     * 
     */
    let setSettings = () => {
        Database.getAllItemsFromObjectStore("Settings").then(settings => {
            let theme = settings[0].settingValue;
        
            let currentClass = document.querySelector("body").classList.item(0);
        
            document.querySelector("body").classList.replace(currentClass, theme);

            setIconForTheme(theme);
        });
        console.log("Reading settings");
    }


    // Interne Hilfsmethode zum Anzeigen des Overlay, das Speichern erfolgreich war.
    const showHideOverlay = () => {
        let elem = document.querySelector('#successful-save');
        elem.classList.remove('showHideOverlay');
        setTimeout(() => {
            elem.classList.add('showHideOverlay');
        }, 2000);
    }

    
    // Nötig, damit die Methoden von ausserhalb des Objekts zugreibar sind.
    return {
        setSettings,
        showHideOverlay
    }
}();// Settings-Objekt Ende

window.addEventListener('load', SettingsController.setSettings);