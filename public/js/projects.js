/**
 * Dieses Script ist verantwortlich für die Projekterstellung und
 * Projektnavigation.
 * 
 * @copyright Gruppe 15
 * @author Frederic Karliczek <frederic.karliczek@stud.the-luebeck.de>
*/

/**
 * Hilfsfunktion, um alle event listener der Elemente zu bündeln.
 */
function addCustomEventListeners() {

    let addButton = document.querySelector("#new-project-btn");
    // Bei Klick auf den Button "Neue Aufgabe" wird Overlay angezeigt
    addButton.addEventListener('click', () => {
        document.getElementById("title-validation-message").innerHTML = '';
        document.querySelector("#title-project").value = '';
        showOverlay(".overlay-project");
    });

    let projectList = document.querySelector("#project-list");

    projectList.addEventListener('click', function (event) {
        let element = event.target;
        if (element.closest('.project-link')) {
            openProject(element.querySelector('span').innerHTML);
        }
    });

    let deleteProjectBtn = document.querySelector('#deletePrjctBtn');
    deleteProjectBtn.addEventListener('click', function (event) {
        let warning = confirm("Möchtest du wirklich dieses Projekt löschen?");
        if (warning) {
            let projectItemToRemove = projectList.querySelector(".project-link-active");
            let projectNameToRemove = projectItemToRemove.querySelector('span').innerHTML;
            projectList.removeChild(projectItemToRemove.parentElement);
            let updatedProjects = projectList.querySelectorAll(".project-link");
            let projectNameToOpen = updatedProjects[0].querySelector('span').innerHTML;
            openProject(projectNameToOpen);
            Database.getItemsFromObjectStoreByIndex("Projects", "projectName", projectNameToRemove).then(projects =>
                projects.forEach(project => {
                    Database.deleteItemInObjectStore("Projects", project.pID);
                })
            );
        }
    }); 
    loadProjectList("default");
}


/**
 * Erstellt ein neues Projekt mit dem übergebenen Namen. Es wird ein Projekt-Element
 * in der Projektliste erstellt, sowie ein Object in der Datenbank angelegt.
 * 
 * @param {string} projectName Name des Projektes welches erstellt werden soll
 */
function createProject(projectName) {
    if (projectName != null || projectName.length > 4) {
        addProject(projectName);
        let project = new Project(projectName)
        Database.addItemToObjectStore("Projects", project);
        Snackbar(
            "Projekt erfolgreich erstellt: " + projectName,
            snackTypes.SUCCESS
        ).showSnack();
    }
}

/**
 * Läd aus der Datenbank alle Projekte und fügt diese der Projektliste hinzu. Über den
 * "mode" Parameter wird das erste Projekt automatisch ausgewählt, sobald man auf die Seite
 * "Projekte" klickt.
 * 
 * @param {string} mode definiert, ob ein Projekt automatisch geöffnet werden soll.
 */
function loadProjectList(mode) {
    // get all projectnames from ObjectStore "Projects" and index "projectName"
    Database.getAllItemsFromObjectStore("Projects", "projectName").then(projects => 
        projects.forEach(project => {
            let projectList = document.getElementById("project-list");

            // check if an item with the current projectname from the database already exists in the list
            let elementExists = false;
            let elementsInProjectList = projectList.querySelectorAll("li a p");
            elementsInProjectList.forEach((element) => {
                if (element.innerHTML == project.projectName) {
                    elementExists = true;
                }
            });

            // if the element not exists, create a new one and add it to the projectlist
            if (!elementExists) {
                addProject(project.projectName);
            }
        })

    ).then( () => {
        if (mode == "default") {
            let projectList = document.getElementById("project-list");
            let firstProject = projectList.querySelector("li span").innerHTML;
            openProject(firstProject);
        }
    });
}

/**
 * Erstellt ein neues Projekt Element in der Projektliste aus einem hinterlegtem
 * Template.
 * 
 * @param {string} projectName Name des Projektes welches erstellt werden soll
 */
function addProject(projectName) {
    let projectList = document.getElementById("project-list");
    // hole den Inhalt des Templates
    let projectItemTemplate = document.querySelector("#project-list template").content;
    let span = projectItemTemplate.querySelector('span');
    span.textContent = projectName;
    // erstellt einen Clon, welcher nachher hinzugefügt werden kann
    let node = document.importNode(projectItemTemplate, true);
    node.addEventListener("click", function() {
        openProject(projectName);
    }, true);
    // fügt den Clon der Projektliste hinzu
    projectList.insertBefore(node, projectList.querySelector("li"));
}

/**
 * Öffnet das ausgewählte Projekt und läd die Aufgaben des Projektes.
 * 
 * @param {string} projectName Names des zu öffnenden Projektes
 */
function openProject(projectName) {
    toggleProject(projectName);
    document.querySelector("#project-heading").innerHTML = projectName;
    let table = document.querySelector('.task-table');
    // remove first all content (switching between projects)
    removeAllRowsFromTable(table)
    loadTasksTable(projectName);
}

/**
 * Hilfsfunktion, um alle Zeilen der Tabelle zu entfernen.
 * 
 * @param {table-node} table Tabelle an der alle Zeilen entfernt werden soll.
 */
function removeAllRowsFromTable(table) {
    table.querySelector('tbody').innerHTML = '';
}

/**
 * Hilfsfunktion, um das gerade ausgewählte Projekt visuell hervor zu heben. 
 * 
 * @param {string} projectName Name des ausgewählten Projektes
 */
function toggleProject(projectName) {
    let projects = document.querySelectorAll(".project-link");
    projects.forEach(project => {
        if (project.querySelector('span').innerHTML == projectName) {
            project.classList.add("project-link-active");
        }
        else {
            project.classList.remove("project-link-active")
        }

    });
}

window.addEventListener('load', addCustomEventListeners);