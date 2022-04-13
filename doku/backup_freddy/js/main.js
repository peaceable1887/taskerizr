/**
 * Gruppe-15
 */

function addEventListeners() {
    var button_addProject = document.getElementById("button-add-project");
    button_addProject.addEventListener("click", createProject, true);

}

function createProject() { 
    var projectName = prompt("Bitte gebe einen Projektnamen ein: ");
    if (projectName != '') {
        var projectList = document.querySelector("#sidebar nav ul");
        var liContent = '<a href="#">' + projectName + '</a>';
        var liElement = document.createElement('li');
        liElement.innerHTML = liContent;
        projectList.appendChild(liElement);
    }
}

window.onload=addEventListeners;