/**
 * @author Felix Hansmann
 *
 * search.js sollte eigentlich die passenden Daten aus der DB auslesen und bei eingabe die entsprechenden Tasks anzeigen.
 * Sodass man bei Submit zum jeweiligen Task in der Projektansicht kommt.
 *
 * der autocomplete Funktion werden zwei Parameter übergeben, zum einen das Textfeld element
 * und ein Array von möglichen Werten.
 */
function autocomplete(inp, arr) {

  let currentFocus;

  inp.addEventListener("input", function(e) {
      let a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;

      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");

      this.parentNode.appendChild(a);

      for (i = 0; i < arr.length; i++) {

        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

          b = document.createElement("DIV");

          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);

          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

          b.addEventListener("click", function(e) {

              inp.value = this.getElementsByTagName("input")[0].value;

              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      let x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {

        currentFocus++;

        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;

        addActive(x);
      } else if (e.keyCode == 13) {

        e.preventDefault();
        if (currentFocus > -1) {

          if (x) x[currentFocus].click();
        }
      }
  });
  /*a function to classify an item as "active":*/
  function addActive(x) {

    if (!x) return false;

    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);

    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {

    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
  function closeAllLists(elmnt) {

    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}
//let Task nur mit Dummie-Daten gefüllt. Haben es nicht mehr geschafft es mit der Datenbank zu verbinden.
let tasks = ["Müll rausbringen", "Spüler einräumen", "Wäsche waschen", "Aufgabe", "Ticket 20859 bearbeiten", "Ticket 20860 bearbeiten", "Das könnte eine Aufgabe sein", "Bade",
"Credit aufnehmen", "Duschen", "Früher aufstehen"];

autocomplete(document.getElementById("myInput"), tasks);