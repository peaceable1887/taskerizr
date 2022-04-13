/**
 * Author: Marc A. Fischer
 * 
 * Konstruktorfunktion, um Charts darzustellen
 * @param {String} canvasName | Der Name des Canvas im HTML-Code
 * @param {array} data | Die Daten, mit denen die Diagramme gezeichnet werden
 * @param {array} colors | Die Farben zum Darstellen der Diagramme
 * 
 * Anregungen: https://stackoverflow.com/questions/15898236/how-to-draw-doughnut-with-html5-canvas
 */
function Charts(canvasName, data, colors) {

    let canvas = document.querySelector(canvasName);

    let context = canvas.getContext("2d");
    
    // define the donut
    let canvasX = Math.floor(canvas.width / 2);
    let canvasY = Math.floor(canvas.height / 2);
    let radius = Math.min(canvasX, canvasY) * 1;
    
    let defaultColor = "#777";
    
    /*******************Gradient ******************************/
    let gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    //gradient.addColorStop(0, "#fff");
    gradient.addColorStop(1, "#eee");
    
    context.fillStyle = "#eee";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // track the accumulated arcs drawn so far
    let totalArc = 0;
    
    // Zählt alle vorhandenen Daten zusammen
    const getPercentOfTotal = () => {
        let total = 0;
        data.forEach(dataItem => {
            total += dataItem;
        });
        return total;
    }
    
    // draw a wedge
    const drawWedge2 = (percent, color) => {
        // calc size of our wedge in radians
        //let WedgeInRadians = ((percent / 100) * 360 * Math.PI) / 180;
        let wedgeInRadians = percent / (getPercentOfTotal() / 2) * Math.PI;
    
        if (getPercentOfTotal() == 0) {
            wedgeInRadians = 360;
        }
    
    
      // draw the wedge
        context.save();
        context.beginPath();
        context.moveTo(canvasX, canvasY);
        context.arc(canvasX, canvasY, radius, totalArc, totalArc + wedgeInRadians, false);
        context.closePath();
    
    
        context.fillStyle = color;
    
        if (getPercentOfTotal() == 0) {
            context.fillStyle = defaultColor;
        }
    
        context.fill();
        context.restore();
        // sum the size of all wedges so far
        // We will begin our next wedge at this sum
        totalArc += wedgeInRadians;
    }
    
    // draw the donut one wedge at a time
    const drawDonut = (text, value) => {

        data.forEach((dataItem, index) => {
            drawWedge2(data[index], colors[index]);
        });
    
        context.beginPath();
        context.moveTo(canvasX, canvasY);
        context.fillStyle = gradient;
        context.arc(canvasX, canvasY, radius * 0.6, 0, 2 * Math.PI, false);
        context.fill();
    
        context.strokeStyle = "#aaa";
        context.font = "bold 50pt Calibri";
        context.textAlign = "center";
        context.fillStyle = "#666";
        context.fillText(value, canvas.width / 2, canvas.height / 2);
    
        context.font = "bold 20pt Calibri";
        context.globalAlpha = 0.4;
        context.fillText(text, canvas.width / 2, canvas.height / 1.7);
    }

    return {
        drawDonut
    }
};

let projectsOpen = 0;
let projectsClosed = 0;

let tasksOpen = 0;
let tasksClosed = 0;

// Befüllt die Daten vom Projekt-Diagramm und zeichnet es
Database.getAllItemsFromObjectStore("Projects").then(projects => {
    projects.forEach(project => {
        if (project.status == "offen") {
            projectsOpen++;
        } else {
            projectsClosed++;
        }
    });


    let projectData = [];

    let projectColors = [];

    // Datensatz offene Aufgaben
    projectData.push(projectsOpen);
    // Datensatz geschlossene Aufgaben
    projectData.push(projectsClosed);

    // Farbe für offene Tasks
    projectColors.push("#1C8D73");
    // Farbe für abgeschlossene Tasks
    projectColors.push("#B4161B");

    let charts1 = Charts('.canvas', projectData, projectColors);
    charts1.drawDonut("Projekte", projectsOpen + projectsClosed);
});

// Befüllt die Daten vom Aufgaben-Diagramm und zeichnet es
Database.getAllItemsFromObjectStore("Tasks").then(tasks => {
    tasks.forEach(task => {
        if (task.status == "offen") {
            tasksOpen++;
        } else {
            tasksClosed++;
        }
    });


    let taskData = [];

    let taskColors = [];

    // Datensatz offene Aufgaben
    taskData.push(tasksOpen);
    // Datensatz geschlossene Aufgaben
    taskData.push(tasksClosed);

    // Farben für Aufgaben
    taskColors.push("#E8BD0D");
    taskColors.push("#FF6666");

    let charts2 = Charts('.canvas2', taskData, taskColors);
    charts2.drawDonut("Aufgaben", tasksOpen + tasksClosed);
});
