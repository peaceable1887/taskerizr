/**
 * Die Funktionen dieser Datei sind für die Bearbeitung und Erstellung der Aufgaben
 * zuständig.
 * 
 * @author Felix Hansmann
 * @author Frederic Karliczek
*/

/**
 * Diese Funktion bündelt das Hinzufügen der event listener der Elemente des
 * task overlays. 
 */
function addCustomEventListeners() {
    let taskOverlay = document.querySelector(".overlay-task");
    taskOverlay.addEventListener('click', (event) => {
        // Bei Klick irgendwo auf dem Bildschirm, aber wenn es nicht auf dem Formular ist. 
        // Ausgenommen dem Button Beenden
        if (!event.target.closest(".overlay-task form") ||
            event.target.closest(".overlay-close-button")) 
            closeOverlay(".overlay-task");
    });

    let btnAdd = document.querySelector("#overlay-task-create-button");
    btnAdd.addEventListener("click", function (params) {
        let task = createTaskObjectFromOverlayInput();
        createTask(task);
    });

    let saveTaskBtn = document.querySelector('#overlay-task-save-button');
    saveTaskBtn.addEventListener('click', function (params) {
        let taskID = taskOverlay.querySelector('#overlay-task-taskID').innerHTML;
        saveTask(taskID);
    } );
}

/*
* Lies die die Inputs aus dem "overlay_task" ein, formatiert u.a. das Datum in ein deutsches Format
* und speichert die Daten in das Objekt "task" und gibt dieses zurück.
*/
function createTaskObjectFromOverlayInput() {

    let title = document.querySelector("#title").value;
    let startDate = document.querySelector("#start-date").value;
    let endDate = document.querySelector("#due-to").value;
    let reminder = document.querySelector("#date-remember").value;
    let priority = document.querySelector("#priority").value;
    let description = document.querySelector("#descriptionField").value;

    //convert startDate
    let getStartDate = new Date(startDate);
    let convStartDate = convertDateObjectToGermanFormatString(getStartDate);

    //convert endDate
    let getEndDate = new Date(endDate);
    let convEndDate = convertDateObjectToGermanFormatString(getEndDate);

    //convert reminder
    let getReminderDate = new Date(reminder);
    let timeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute:"2-digit"};
    let convReminder = getReminderDate.toLocaleDateString("de-DE", timeFormatOptions);
    console.log(convReminder);

    // get the current active project
    let currentProject = document.querySelector('.project-link-active span').innerHTML;

    // validiert ob der die Länge des angegebenen Titels wenigstens
    // 2 Zeichen beträgt.
    if(title.length > 1) {
        let task = new Task(
            currentProject,
            title,
            convStartDate,
            convEndDate,
            convReminder,
            priority,
            description
        );
    
        return task;

    } else {
        alert("Bitte Titel ausfüllen!");
    }
}

/**
 * Diese holt die Aufgabe mit der übergebenen taskID aus der Datenbank und speichert die
 * geänderten Werte aus dem task overlay wieder zurück in das selbe Object.
 * 
 * @param {string} taskID die taskID der Aufgabe, welche gespeichert werden soll
 */
function saveTask(taskID) {
    Database.getItemsFromObjectStoreByIndex("Tasks", "tID", taskID).then(tasks => 
        tasks.forEach(task => {
            let updatedTask = createTaskObjectFromOverlayInput();
            task.title = updatedTask.title;
            task.startDate = updatedTask.startDate;
            task.endDate = updatedTask.endDate;
            task.reminder = updatedTask.reminder;
            task.priority = updatedTask.priority;
            task.description = updatedTask.description;
            Database.updateItemInObjectStore("Tasks", task);
            let table = document.querySelector('.task-table');
            removeAllRowsFromTable(table);
            loadTasksTable(task.project);
            closeOverlay(".overlay-task");
        })
    );
}

/**
 * Die Funktion holt die Aufgabe mit der übergebenen taskID aus der Datenbank, läd die
 * Daten des Task-Objektes in das task overlay und zeigt dieses an. Diese Funktion ermöglicht das
 * Bearbeiten einer existierenden Aufgabe.
 * 
 * @param {string} taskID die taskID der Aufgabe, welche editiert werden soll
 */
function editTask(taskID) {
    Database.getItemsFromObjectStoreByIndex("Tasks", "tID", taskID).then(tasks => 
        tasks.forEach(task => {
            document.querySelector('#overlay-task-save-button').style.display = "inline-block";
            document.querySelector('#overlay-task-create-button').style.display = "none";
            loadTaskDataInOverlay(task);
            showOverlay(".overlay-task");
        })
    );
}

/**
 * Läd die Werte, des übergebenen Task-Objektes in die Inputfelder des task overlays.
 * Diese Funktion wird benutzt, um eine Aufgabe auch editieren zu können.
 * 
 * @param {task} task das task object mit den task Daten
 */
function loadTaskDataInOverlay(task) {

    let taskOverlay = document.querySelector(".overlay-task");
    let overlayTaskID = taskOverlay.querySelector('#overlay-task-taskID');
    let titleInput = taskOverlay.querySelector('#title');
    let startDateInput = taskOverlay.querySelector('#start-date');
    let dueDateInput = taskOverlay.querySelector('#due-to');
    let rememberDateInput = taskOverlay.querySelector('#date-remember');
    let prioritySelect = taskOverlay.querySelector('#priority');
    let descriptionField = taskOverlay.querySelector('#descriptionField');

    overlayTaskID.innerHTML = task.tID;
    titleInput.value = task.title;
    startDateInput.valueAsDate = convertGermanFormatStringToDateObject(task.startDate);
    dueDateInput.valueAsDate = convertGermanFormatStringToDateObject(task.endDate);
    rememberDateInput.value = task.reminder;
    prioritySelect.value = task.priority;
    descriptionField.text = task.description;
}

/**
 * Konvertiert den Datumswert aus dem Overlay in ein deutsches Format.
 * Zusätzlich wird ein ausgelassenes Datumsfeld abgefangen und als "Keine Angabe" angegeben.
 * 
 * @param {date} date das Date Object, welches umgewandelt werden soll
 */
function convertDateObjectToGermanFormatString(date) {
    let compareOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
    let germanFormat = date.toLocaleDateString("de-DE", compareOptions);
    if (germanFormat == "Invalid Date") {
        germanFormat = "Keine Angabe";
    }
    return germanFormat
}

/**
 * Konvertiert ein Datum als string im deutschen Format in ein Javacript
 * Date Object
 * 
 * @param {string} germanFormatString 
 */
function convertGermanFormatStringToDateObject(germanFormatString) {

    let splitArray = germanFormatString.split(".");
    let dateObject = new Date(Number(splitArray[2]), (Number(splitArray[1]) - 1), (Number(splitArray[0]) + 1));
    return dateObject;
}

window.addEventListener('load', addCustomEventListeners);