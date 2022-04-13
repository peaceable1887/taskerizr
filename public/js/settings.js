/**
 * 
 * @author Marc A. Fischer, Tom Gibson
 * 
 * Die Funktion Settings dient zum Umschalten, des Themes beim Klicken der Theme-Buttons auf der 
 * Seite settings.html
 */
// Erscheinungsbild
let Settings = function () {
    // Button für Light-Theme
    const btnLight = document.getElementById("light-mode");
    // Button für Dark-Theme
    const btnDark = document.getElementById("dark-mode");
    // Button zum Speichern
    const btnSave = document.querySelector('#save-settings');
    //let btns = document.getElementsByClassName("btn-themes");

    /**
     * Die 
     * @param {event} event 
     */
    let toggleTheme = (event) => {
        let element = event.target;
        let body = document.querySelector("body");


        switch (element.id) {
            case "light-mode":
                console.log("Light-Mode clicked!");
                body.classList.remove("dark-theme");
                body.classList.add("light-theme");
                setIconForTheme("light-theme");
                break;
            case "dark-mode":
                console.log("Dark-Mode clicked!");
                body.classList.remove("light-theme");
                body.classList.add("dark-theme");
                setIconForTheme("dark-theme");
                break;
        }
    }


    /**
     * 
     * Das gerade active Theme wird ausgelesen und in den Settings gespeichert. 
     * 
     */
    let saveSettings = () => {
        let themeName = document.querySelector('body').classList[0];

        let Settings = new Setting("theme", themeName);
        Database.updateItemInObjectStore("Settings", Settings);
        Snackbar(
            "Einstellungen erfolgreich gespeichert!",
            snackTypes.SUCCESS
        ).showSnack();
    }

    /**
     * Die Methode nimmt einen Parameter entgegen. Je nach Theme werden im Header unterschiedliche 
     * Icons gesetzt.
     * @param {theme} theme 
     */
    const setIconForTheme = (theme) => {
        let iconImg = document.querySelector("#time-area img");

        iconImg.src = (theme == "dark-theme") ? "images/moon.png" : "images/icon-clouds.png";
    }


    /**
     * 
     */
    let addAllEventListeners = () =>  {
        btnLight.addEventListener('click', toggleTheme);
        btnDark.addEventListener('click', toggleTheme);
        btnSave.addEventListener('click', saveSettings);
    }


    return {
        addAllEventListeners
    }
}();

Settings.addAllEventListeners();

window.addEventListener('load', Settings.setSettings);

