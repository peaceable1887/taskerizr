/**
 * Aufgabe zum Thema Formularvalidierung und
 * Formularwerte auslesen.
 * Schreiben Sie ein Skript, das Ihr Formular validiert
 * und die Formulardaten im JSON-Format speichert.
 * Schauen Sie zur Orientierung in die Übungs-Dateien aus der Vorlesung.
 */

    /*
    * initiate() dient dem Setzen von Eventlistenern,
    * - die zu Beginn gebraucht werden, um in Echtzeit die Nutzereingabe zu prüfen;
    * - für den Button.
    * */
    function initiate(){
        //add event listeners

    }

    /*
    * Funktion, um Eingabefelder in Echtzeit zu prüfen und
    * Felder farblich zu markieren, wenn Validierung fehlschlägt
    * */
    function checkval(e){
        console.log("Funktion checkval()"); //schauen Sie in der Konsole, ob in die Funktion gesprungen wird
        var elem=e.target;                  //Zugriff auf das Elment, das das Event ausgelöst hat

        if(...){

        }else{

        }
    }


    /*
    * Funktion, die auf den Button-Klick reagiert.
    * Sie prüft zunächst das Formular auf Validität.
    * Valide: Formulardaten werden ausgegeben entsprechend Aufgabenstellung.
    * Nicht-Valide: Fehlermeldung wird ausgegeben entsprechend Aufgabenstellung.
    * */
    function checkform(e) {
        //Prüfen des Formulars mit checkValidity(); setzen einer bool-Variable


        //Prüfen, ob Formular valide (Nutzen Sie die o.g. Bool-Variable)
        if (...) {
            // Prüfen auf weitere Bedingung: Auslesen von geschmack und speiseart.
            // Zunächst: Auslesen von Form-Eingaben. Tipp: Ausgabe der Werte in Konsole zur Überprüfung.


            // Dann Abfrage, ob Bedingungen aus Aufgabenstellung erfüllt und
            // Anweisungen, was in beiden Fällen jeweils passieren soll (if-Abfrage)






        }else{
            //Problemfall: Die erste Prüfung mit checkValidity() war nicht erfolgreich
            console.log("Validierung fehlgeschlagen");

        }
    }


    /*
    * Diese Funktion kümmert sich um den Output. Sie erledigt hier mehrere Aufgaben:
    * - Einsammeln der Formulardaten und erstellung eines entsprechenden Objekts
    * - Ausgabe in der DOM-Struktur
    * - Umwandlungen zwischen Object und JSON und dessen Ausgabe
    * */
    function makeOutput(){
        console.log("makeoutput");
        //Auslesen der Formulardaten:


        //Erstellen eines Objekts:

        //Ausgabe Konsole zum Test:



        // Output in DOM:
        // a. Nutzen des divs für die Rezeptausgabe


        // b. Erstellen von p-Elementen für jede Rezepteigenschaft und eingliedern in das Rezept-Div
        // (textknoten, HTML-Tag, zusammenbinden; das an Rezept-div dranhängen):



        //DoJsonStuff


    }


    /*
     * Diese Funktion schreibt Fehlermeldungen in die DOM-Struktur.
     * Dafür baut sie ein HTML-Element zusammen und fügt es ein.
     * Der Textknoten hängt davon ab, von wo die Funktion aufgerufen wurde.
     */
    function errorToDOM(msg){
        console.log("msg = " + msg);
        //Erstelle neues DOM-Element für die Ausgabe, das in die Ausgabe-Section hinzugefügt wird.

        //Abfragen des msg-Parameters


        //DOM-Element für Message bauen und einfügen

    }

/*
 * **************************
 *
 * Funktionalität für die IndexedDB
 *
 * **************************
 * /


window.onload=initiate;