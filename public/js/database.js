/**
 * Diese Datei enthällt die Klassen, aus denen die Datenobjekte der Anwendung
 * erstellt werden. Außerdem wird mithilfe des Module Pattern ein globales
 * Database Objekt erstellt, welches alle Funktionen (CRUD) zur Interaktion 
 * mit der IndexDB bereit stellt.
 * 
 * @author Frederic Karliczek <frederic.karliczek@stud.th-luebeck.de>
*/

/**
 * Project Klasse
 */
class Project {
    constructor(projectName) {
        this.projectName = projectName;
        this.status = Stadien.OPEN;
    }
}

/**
 * Task Klasse
 */
class Task {
    constructor(project,title, startDate, endDate, reminder, priority, description) {
        this.project = project;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reminder = reminder;
        this.priority = priority;
        this.description = description;
        this.status = Stadien.OPEN;
    }
}

/**
 * Setting Klasse
 */
class Setting {
    constructor(settingName, settingValue) {
        this.settingName = settingName;
        this.settingValue = settingValue;
    }
}

/**
 * Enum zur Definition von Aufgaben und Projekt Stadien
 */
const Stadien = {
    OPEN: 'offen',
    CLOSED: 'geschlossen'
}

/**
 * Hier wird das Modul pattern angewand, um die interne Struktur zu verstecken und
 * nur ausgewählte Funktionen als Schnittstelle bereit zu stellen.
 */
let Database = function() {

    let dbName = "WPGruppe15";
    let dbVersion = 1;

    let obsProjects = "Projects";
    let obsTasks = "Tasks";
    let obsSettings = "Settings";

    // definieren von Beispiel-Daten
    const defaultProjects = [
        new Project("Haushalt"),
        new Project("Arbeit"),
        new Project("Privat")
    ];

    const defaultTasks = [
        new Task(
            "Haushalt",
            "Müll rausbringen",
            "26.01.2021",
            "28.01.2021",
            "27.01.2021",
            "HOCH",
            "Dieser Task ist ein Testtask!"
        ),
        new Task(
            "Haushalt",
            "Spüler einräumen",
            "26.01.2021",
            "26.01.2021",
            "26.01.2021",
            "HOCH",
            "Das Geschirr stapelt sich schon"
        ),
        new Task(
            "Haushalt",
            "Wäsche waschen",
            "29.01.2021", 
            "30.01.2021",
            "31.01.2021",
            "NIEDRIG",
            "Brauch endlich frische Klamotten"
        ),
        new Task(
            "Arbeit",
            "Ticket 20859 bearbeiten",
            "29.01.2021", 
            "30.01.2021",
            "31.01.2021",
            "MITTEL",
            "Der Hugo kann sein Outlook nicht bedienen"
        ),
        new Task(
            "Arbeit",
            "Ticket 20860 bearbeiten",
            "29.01.2021", 
            "30.01.2021",
            "31.01.2021",
            "HOCH",
            "Chef braucht mal wieder unterstützung beim sortieren seiner Kontakte."
        )
    ];

    const defaultSettings = [
        new Setting("theme","dark-theme")
    ];

    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB | window.msIndexedDB;
    if (!window.indexedDB) {
        alert("IndexedDB wird auf Ihrem System nicht unterstützt!")
    }

    let request = window.indexedDB.open(dbName, dbVersion)
    request.addEventListener('error', showError, false);
    request.addEventListener('upgradeneeded', createDB);
    //request.addEventListener('success', seedDatabase);

    /**
     * Diese Funktion erstellt die IndexDB Datenbank, alle ObjectStores und erstellt
     * fügt die Beispiel-Daten ein, wenn das Event "upgradeneeded" ausgelöst wird.
     * 
     * @param {event} e event object
     */
    function createDB(e) {
        let db, store, index
        console.log("Database onupgradeneeded called");
        db = e.target.result;
        store = db.createObjectStore(obsProjects, {
            keyPath: "pID",
            autoIncrement: true
        }),
        index = store.createIndex("projectName", "projectName", {unique: true}),
        index = store.createIndex("status", "status", {unique: false});


        defaultProjects.forEach(project => {
            store.add(project);
        });

        store = db.createObjectStore(obsTasks, {
            keyPath: "tID",
            autoIncrement: true
        }),
        index = store.createIndex("title", "title", {unique: false}),
        index = store.createIndex("startDate", "startDate", {unique: false}),
        index = store.createIndex("endDate", "endDate", {unique: false}),
        index = store.createIndex("reminder", "reminder", {unique: false}),
        index = store.createIndex("priority", "priority", {unique: false}),
        index = store.createIndex("description", "description", {unique: false}),
        index = store.createIndex("status", "status", {unique: false});

        defaultTasks.forEach(task => {
            store.add(task);
        });

        store = db.createObjectStore(obsSettings, {
            keyPath: "settingName",
            autoIncrement: true
        });

        defaultSettings.forEach(setting => {
            store.add(setting);
        });
    }

    function showError(e) {
        console.log("Ein Fehler ist aufgetreten: " + e.target.errorCode);
    }

    /**
     * Diese Funktion holt alle Objekte des angegebenen Objectstores und gibt diese
     * asynchron als array zurück.
     * 
     * @param {string} objectStoreName Name des Objectstores
     */
    async function getAllItemsFromObjectStore(objectStoreName) {
        return new Promise((resolve, reject) => {
            let request = window.indexedDB.open(dbName, dbVersion)
            request.onsuccess = function (e) {
                let db = e.target.result;
                let tx = db.transaction(objectStoreName, "readonly");
                let store = tx.objectStore(objectStoreName);

                let req = store.openCursor(null,'next');
                let items = [];

                req.onsuccess = function(event) {
                    // The result of req.onsuccess is an IDBCursor
                    let cursor = event.target.result;

                    if (cursor != null) {
                    // If the cursor isn't null, we got an IndexedDB item. Add it to the
                    // item array and have the cursor continue!
                    items.push(cursor.value);

                    // cursor.continue has the cursor move to the next item; we keep looping
                    // through the objects because that causes req.onsuccess to fire again
                    cursor.continue();
                    } else {
                    // If we have a null cursor, it means we've gotten all the 
                    // items in the store
                        resolve(items);
                    }
                }

                req.onerror = function(event) {
                    reject("Could not open cursor on: " + objectStoreName);
                }

                tx.oncomplete = function () {
                    db.close();
                }
            }
            request.onerror = function(e) {
                reject("Could not open database from: " + e.target.result)
            }
        });
    }

    /**
     * Diese Funktion gibt alle Objekte zurück, die in dem ObjectStore liegen und dem Index 
     * mit dem entsprechenden Wert entsprechen.
     * 
     * @param {string} objectStoreName Name des Objectstore
     * @param {string} objectStoreIndex Index des Objectstore
     * @param {string} objectName Wert, welcher gesucht wird
     */
    async function getItemsFromObjectStoreByIndex(objectStoreName, objectStoreIndex, objectName) {
        return new Promise((resolve, reject) => {
            let request = window.indexedDB.open(dbName, dbVersion)
            request.onsuccess = function (e) {
                let db = e.target.result;
                let tx = db.transaction(objectStoreName, "readonly");
                let store = tx.objectStore(objectStoreName);

                let req = store.openCursor(null,'next');
                let items = [];

                req.onsuccess = function(event) {
                    // das Ergebnis von req.onsuccess ist ein IDBCursor
                    let cursor = event.target.result;

                    if (cursor != null) {
                        /**
                         * wenn der cursor nicht null ist, und das Item mit dem Index 
                         * den gewünschten Wert hat, füge es dem array hinzu und
                         * lasse den cursor fortfahren
                         */
                        if (cursor.value[objectStoreIndex] == objectName) {
                            items.push(cursor.value);
                        }
                        // cursor.continue lässt den cursor zum nächsten item springen
                        // req.onsuccess wird automatisch wieder ausgelöst und die Abfrage
                        // beginnt von vorn.
                        cursor.continue();
                    } else {
                        // wenn der cursor null ist, haben wir alle items und geben
                        // diese zurück
                        resolve(items);
                    }
                }

                tx.oncomplete = function () {
                    db.close();
                }
            }
        });
    }

    /**
     * Fügt eine object dem gewünschten Objectstore hinzu.
     */
    function addItemToObjectStore(objectStoreName, item) {
        let request = window.indexedDB.open(dbName, dbVersion)
        request.onsuccess = function (e) {
            let db = e.target.result;
            let tx = db.transaction(objectStoreName, "readwrite");
            let store = tx.objectStore(objectStoreName);

            store.add(item);

            tx.oncomplete = function () {
                db.close();
            }
        }
    }

    /**
     * Speichert ein array von objecten in den entsprechenden ObjectStore
     * 
     * @param {string} objectStoreName Name des ObjectStores
     * @param {object[]} items Elemente welche gespeichert werden sollen
     */
    function addItemArrayToObjectStore(objectStoreName, items) {
        let request = window.indexedDB.open(dbName, dbVersion)
        request.onsuccess = function (e) {
            let db = e.target.result;
            let tx = db.transaction(objectStoreName, "readwrite");
            let store = tx.objectStore(objectStoreName);
            
            items.forEach(element => {
                store.add(element);
            });

            tx.oncomplete = function () {
                db.close();
            }
        }
    }

    /**
     * Dieses Funktion updated das angegebene Item. Für das Update, 
     * muss das Item in der IndexDB und das angebene Item den gleichen Key
     * besitzen.
     * 
     * @param {string} objectStoreName Name des Objectstores
     * @param {object} item Item, welches geupdated werden soll
     */
    function updateItemInObjectStore(objectStoreName, item) {
        let request = window.indexedDB.open(dbName, dbVersion)
        request.onsuccess = function (e) {
            let db = e.target.result;
            let tx = db.transaction(objectStoreName, "readwrite");
            let store = tx.objectStore(objectStoreName);

            let req = store.put(item);

            req.onsuccess = function () {
                console.log("DATABASE | Succesful updated record: " + item)
            }
            
            tx.oncomplete = function () {
                db.close();
            }
        }
    }

    /**
     * Löscht einen Eintrag aus dem angegebenen Objectstore 
     * mit dem entsprechenden key.
     * 
     * WICHTIG! Der Key muss als Number geparst werden, damit dieser in der
     * IndexDB gefunden wird. Siehe selbst erstellter StackOverflow Eintrag:
     * https://stackoverflow.com/q/65961843/15108625
     * 
     * @param {string} objectStoreName Name des Objectstores
     * @param {string} itemKey Key des zu löschenden Items
     */
    function deleteItemInObjectStore(objectStoreName, itemKey) {
        let request = window.indexedDB.open(dbName, dbVersion)
        request.onsuccess = function (e) {
            let db = e.target.result;
            let tx = db.transaction(objectStoreName, "readwrite");
            let store = tx.objectStore(objectStoreName);

            // hier wird der key nochmal als Number geparst.
            let req = store.delete(Number(itemKey));
            
            req.onsuccess = function () {
                console.log("DATABASE | Successful deleted from Objectstore: "+ 
                objectStoreName + " | The item with key: " + itemKey);
            }
        
            tx.oncomplete = function () {
                db.close();
            }
        }
    }

    /**
     * Definiert die vom Database object öffentlichen Funktionen
     */
    return {
        getAllItemsFromObjectStore,
        getItemsFromObjectStoreByIndex,
        addItemToObjectStore,
        addItemArrayToObjectStore,
        updateItemInObjectStore,
        deleteItemInObjectStore
    }
}();
