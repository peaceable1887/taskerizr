/**
 * Importiert Daten aus der Datenbank und fügt sie in der einer 
 * Tabelle ein.
 * 
 * @copyright Gruppe 15
 * @author Tom Gibson
 */

 /**
 * Importiert angeforderte Index aus der Datenbank und ruft
 * die Klasse addTaskToTaskList() und gibt die Daten mit
 */
function loadTasksTableByTime(endDateRequest) {
    // fetch all taskitems from database with currentProjectName
    Database.getItemsFromObjectStoreByIndex("Tasks", "endDate", endDateRequest).then( tasks => 
        tasks.forEach(task => {
            let elementExists = false;
            let taskItems = document.querySelectorAll(".task-table tbody tr");
            taskItems.forEach(taskItem => {
                // check if the item with the task id already exists
                let id = taskItem.querySelector('td').innerHTML;
                if (id == task.tID) {
                    elementExists = true;
                }
            });
            
            // if the element not exists, create a new one and add it to the task table
            if (!elementExists) {
                addTaskToTaskList(task);
            }
        })
    );
}

/**
 * Importierte Tasks in die tabelle einfügen
 */
function addTaskToTaskList(task) {

    let taskTableBody = document.querySelector('.task-table tbody');
    // get the task template
    let taskTemplateItem = document.querySelector(".task-table thead template").content;
    let tableCells = taskTemplateItem.querySelectorAll('td');
    // fill the cells with the data from the task object
    tableCells[0].innerHTML = task.tID;
    tableCells[1].innerHTML = task.title;
    tableCells[2].innerHTML = task.startDate;
    tableCells[3].innerHTML = task.endDate;
    tableCells[4].innerHTML = task.priority;
    // import the task to the document DOM
    let node = document.importNode(taskTemplateItem, true);
    // add the task node to the table
    taskTableBody.appendChild(node);
}

/**
 * Laden der Seite
 */
function removeAllRowsFromCalTable(table) {
    table.querySelector('tbody').innerHTML = '';
}