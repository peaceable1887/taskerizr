/**
 * Die Funktionen dieser Datei sind verantwortlich für die Erstellung und
 * Anzeige der Aufgaben in der Aufgabentabelle
 * 
 * @author Frederic Karliczek
 * @author Felix Hansmann
 */

function addEventListeners() {
    let addButton = document.querySelector("#new-task-btn");
    
    // Bei Klick auf den Button "Neue Aufgabe" wird Overlay angezeigt
    addButton.addEventListener('click', () => {
        document.querySelector('#overlay-task-save-button').style.display = "none";
        document.querySelector('#overlay-task-create-button').style.display = "inline-block";
        resetOverlayInputFields();
        showOverlay(".overlay-task");
    });

    let taskTable = document.querySelector('.task-table');
    taskTable.addEventListener('click', function (event) {
        if (event.target.closest('.task-item') && (!event.target.closest('.task-item button'))) {
            let clickedRow = event.target.parentNode;
            let taskID = clickedRow.querySelector('#task-id').innerHTML;
            editTask(taskID);

            let overlayTask = document.querySelector('.overlay-task');
            overlayTask.querySelector('legend').innerHTML = "Aufgabe bearbeiten";
            // showOverlay(".overlay-task");
        }
    });
}

/**
 * Diese Funktion fügt das task-object in die IndexDB ein. Im Anschluss wird das
 * Object wieder aus der IndexDB geladen, um der Aufgabenliste hinzugefügt zu werden.
 * Der Umweg musste genommen werden, damit die IndexDB den richtigen Key automatisch erstellt.
 * 
 * @param {task-object} task das Task-Object welches hizugefügt werden soll
 */
function createTask(task) {

    // save task item to database
    Database.addItemToObjectStore("Tasks" , task);
    // get all tasks from database and fill task table
    loadTasksTable(task.project);
    // close overlay
    closeOverlay(".overlay-task");
    Snackbar(
        "Neuer Task erstellt: " + task.title,
        snackTypes.SUCCESS
    ).showSnack();
}

/**
 * Erstellt für alle Aufgaben eines Projektes die visuellen Elemente in der Aufgabenliste
 * 
 * @param {*} currentProjectName Name des Projektes
 */
function loadTasksTable(currentProjectName) {
    Database.getItemsFromObjectStoreByIndex("Tasks", "project", currentProjectName).then( tasks => 
        tasks.forEach(task => {
            let elementExists = false;
            let taskItems = document.querySelectorAll(".task-table tbody tr");
            taskItems.forEach(taskItem => {
                // überprüfe, ob es das Element in der Liste schon gibt
                let id = taskItem.querySelector('td').innerHTML;
                if (id == task.tID) {
                    elementExists = true;
                }
            });
            // wenn das Element noch nicht existiert, erstelle ein neues Element
            // und füge es der Aufgabenliste hinzu
            if (!elementExists) {
                addTaskToTaskList(task)
            }   
        })
    );
}

/**
 * Erstellt das visuelle HTML Element in der Aufgabenliste und füllte dieses mit
 * den Daten aus dem übergebenen Task Objektes.
 * 
 * @param {*} task Das Task Object
 */
function addTaskToTaskList(task) {

    let taskTableBody = document.querySelector('.task-table tbody');
    let template = document.querySelector("#task-item-template");

    // erstelle einen Klon
    let clone = template.content.firstElementChild.cloneNode(true);

    let tableCells = clone.querySelectorAll('td');
    // fill the cells with the data from the task object
    tableCells[0].innerHTML = task.tID;
    tableCells[1].innerHTML = task.title;
    tableCells[2].innerHTML = task.startDate;
    tableCells[3].innerHTML = task.endDate;
    tableCells[4].innerHTML = task.priority;


    let actionBtns = clone.querySelectorAll('button');

    // korrigiert die Hintergrundfarbe der "Aktionen" buttons wenn man
    // über eine Zeile hovert.
    clone.addEventListener('mouseover', function (event) {
        actionBtns.forEach(btn => {
            btn.style.background = "white";
        });
    });

    clone.addEventListener('mouseleave', function (event) {
        actionBtns.forEach(btn => {
            btn.style.background = "";
        });
    });

    // Öffnet das Aufgaben Overlay zur Bearbeitung der Aufgabe
    actionBtns[0].addEventListener('click', function (event) {
        let rowClicked = this.parentNode.parentNode;
        let taskID = rowClicked.querySelector('#task-id').innerHTML;
        console.log(taskID);
        editTask(taskID);
    });

    // Löscht die Aufgabe
    actionBtns[1].addEventListener('click', function (event) {
        let rowClicked = this.parentNode.parentNode;
        let taskID = rowClicked.querySelector('#task-id').innerHTML;
        let warning = confirm("Möchtest du wirklich diese Aufgabe löschen?");
        if (warning) {
            removeTaskFromTable(rowClicked.rowIndex);
            removeTaskFromDatabase(taskID);
            
        }
    });

    // Makiert die Aufgabe als abgeschlossen oder öffnet diese wieder
    actionBtns[2].addEventListener('click', function (event) {
        let rowClicked = this.parentNode.parentNode;
        let taskID = rowClicked.querySelector('#task-id').innerHTML;
        Database.getItemsFromObjectStoreByIndex("Tasks", "tID", taskID).then(tasks => 
            tasks.forEach(task => {
                let originalStatus = task.status;
                let updatedTask = task;
                if (originalStatus == Stadien.CLOSED) {
                    updatedTask.status = Stadien.OPEN;
                }
                if (originalStatus == Stadien.OPEN) {
                    updatedTask.status = Stadien.CLOSED;
                }
                rowClicked.classList.toggle("task-item-done");
                Database.updateItemInObjectStore("Tasks", updatedTask);
            })
        );
        
    });

    if (task.status == Stadien.CLOSED)  {
        clone.classList.add("task-item-done");
    }
    if (task.status == Stadien.OPEN) {
        clone.classList.remove("task-item-done");
    }

    // fügt das Element der Aufgabenliste hinzu
    taskTableBody.appendChild(clone);
}

/**
 * Setzt alle Felder des Aufgaben Overlay zurück
 */
function resetOverlayInputFields() {
    let inputFields = document.querySelectorAll('.overlay-task input');
    inputFields.forEach(input => {
        input.value = '';
    });
    document.querySelector('.overlay-task textarea').value = '';
    document.querySelector('.overlay-task select').value = 'niedrig';
}

/**
 * Hilfsfunktion, um eine Aufgabe anhand der taskID zu löschen.
 * 
 * @param {string} tID TaskID der zu löschenden Aufgabe
 */
function removeTaskFromDatabase(tID) {
    Database.deleteItemInObjectStore("Tasks", tID);
}

/**
 * Hilfsfunktion, um eine Zeile in der Aufgabenliste anhand des Index
 * zu löschen.
 * 
 * @param {number} index Index der Zeile, welche gelöscht werden soll
 */
function removeTaskFromTable(index){
    let taskTable = document.querySelector(".task-table");
    taskTable.deleteRow(index);
}

// Immer diese Methode verwenden, damit es in anderen files nicht
// zu Problemen kommt, welche auch zu window.onload brauchen.
// http://www.javascriptkit.com/javatutors/multiplejava2.shtml
window.addEventListener('load', addEventListeners);