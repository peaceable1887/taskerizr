/**
 * @author Felix Hansmann
 */
function addEventListeners() {
    const overlay = document.querySelector(".overlay-project");

    overlay.addEventListener('click', (event) => {
        // Bei Klick irgendwo auf dem Bildschirm, aber wenn es nicht auf dem Formular ist.
        // Ausgenommen dem Button Beenden
        if (!event.target.closest(".overlay-project form") || event.target.matches('.overlay-close-button')) { 
            closeOverlay(".overlay-project"); 
        }
    });

    overlay.querySelector("#overlay-project-submit-btn").addEventListener('click', function () {
        let projectTitle = document.querySelector('#title-project');
        let validationMessage = document.getElementById("title-validation-message");
        if (projectTitle.checkValidity() && projectTitle.value.length > 0) {
            createProject(projectTitle.value);
            closeOverlay(".overlay-project"); 
        }
        else {
            validationMessage.innerHTML = "Der Projektname muss mindestens 4 Zeichen lang sein!";
            validationMessage.visibility = "visible";
        }
    });
}

// Immer diese Methode verwenden, damit es in anderen files nicht
// zu Problemen kommt, welche auch zu window.onload brauchen.
// http://www.javascriptkit.com/javatutors/multiplejava2.shtml
window.addEventListener('load', addEventListeners);