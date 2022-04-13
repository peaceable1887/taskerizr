/*Lösung von Gruppe 3
  Bearbeitet von Frederic Karliczek*/

/*
	Adds all initially (and only initially) needed eventListeners
	Do not add event listeners that are supposed to be added dynamically.
	
	Bearbeitet von: Frederic Karliczek
*/
function addListenersFirst(){
	// Add click listener to the upper div with className 'rechtebox'
	// a) put the div elements into a variable
	// b) use variable to add event listener
	var rechteboxen = document.getElementsByClassName("rechtebox");
	var linkeboxen = document.getElementsByClassName("linkebox");

	// Add mouseover listener to the upper div with classname 'linkebox'
	rechteboxen[0].addEventListener('mouseover', flipMe, true);
	linkeboxen[0].addEventListener('click', copyMe, true )

	// Add listeners to action elements for "Make Alerts" "Bezeichner" and "Schreibe den Text"
	var makeAlerts = document.getElementById("a2").getElementsByTagName()





	// add listener to form input elements









}


/*
	copyMe copies the text from one element to another (red boxes)

	Bearbeitet von:
*/
function copyMe(){
	// put the "container"-element (to where the text should copied) into the 
	// variable container (target element)
	container = document.getElementById("container");
	// put the element to be read into the variable divlinks (source element)
	divlinks = document.getElementsByClassName("linkebox")
	// put the content of the source element into text node of the target element
	container.innerHTML = divlinks[0].innerHTML;
}

/*
	flipMe copies the text from one element to another and deletes the text from
	the original element. (green boxes)

    Bearbeitet von:
 */
function flipMe(){
	// works similar to copyMe
	// in addition, delete the text from the source element (i.e. overwrite)
	container = document.getElementById("container2");

	divlinks = document.getElementsByClassName("rechtebox")
	if (divlinks[0].innerHTML !== "") {
		container.innerHTML = divlinks[0].innerHTML;
		divlinks[0].innerHTML = "";
	}
	
	// Was müssen Sie tun, um das Erneute flippen mit Leertext zu verhindern?





}

/*
	makeAlerts() setzt Alert-Funktion auf mehrere Elemente.
	Nutzen Sie dafür eine Schleifenkonstruktion.


	Bearbeitet von:
*/
function makeAlerts(){
	myp = document.querySelectorAll("#a2 p");
	// put event listener for each selected tag
	for (i = 0; i < myp.length; i++) {
		myp[i].addEventListener('click', showNewAlert, true)
	}









}


/*
 showNewAlert() evokes the alert

 Bearbeitet von:
 */
function showNewAlert(){
	// An alert should be displayed with the text of the paragraph that evoked the function.
	// Use "this" to refer to the actual object
	alert(this.innerHTML);


}

/*
	switchME switches the text of two boxes

    Bearbeitet von:
*/
function switchMe(){





}

/*
	changeColor() changes the color of the colored
	boxes depending on the selection of the respective select box.

	Bearbeitet von:
*/
function changeColor(){
	// Variable idName stores the ID of the elements that invoked this function
	var idName = this.id;

	// Use if else statement to distinguish which select box has been used. Alternatively you can use switch.
	// For each case: select the html element that correspond to the used select box.
	// For this element set a new attribute class with the name that corresponds to the selected value.
	// Have a look to the css to know which class will help you.

	// Console log if needed.





	console.log("value: " + this.value + ", id: " + this.id);
}

/*
	createText concatenates text from the input fields.

	Bearbeitet von:
*/
function createText(){






}

/*
     insertToList fügt ein Listenelement hinzu

     Bearbeitet von:
 */
function insertToList(){


}

/*
      removeFromList löscht ein Listenelement.

      Bearbeitet von:
 */
function removeFromList(){



}

window.onload=addListenersFirst;
