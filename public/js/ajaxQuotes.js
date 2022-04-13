/**
 * Zieht mithilfe von Ajax request aus einer Json datei zufällig ein Zitat heraus 
 * und zeigt diesen an. Unter anderem soll ein neues Zitat erscheinen, wenn die 
 * Seite neu geladen wird oder auf den next Button gedrückt wird.
 * 
 * @copyright Gruppe 15
 * @author Tom Gibson
 */

/**
 * nötige Variablen deklariert und Button
 * für weitere Zitate.
 * Aufruf der read() Klasse.
 */
function initiate() {
    quoteElement = document.getElementById("quotes");
    authorElement = document.getElementById("author");
    let button = document.getElementById("nxtQuote");
    button.addEventListener("click", read, false);
}

/**
 * Laden der JSON datei und Aufruf der show() KLasse
 * Es wird nichts gesendet.
 */
function read() {
    let url = "https://gist.githubusercontent.com/b1nary/ea8fff806095bcedacce/raw/6e6de20d7514b93dd69b149289264997b49459dd/enterpreneur-quotes.json";
    let request = new XMLHttpRequest();
    request.addEventListener("load", show, false);
    request.open("GET", url, true);
    request.send(null);
}

/**
 * Anzeigen der importierten Daten der JSON datei.
 */
function show(e) {
    let randomNumber = Math.floor(Math.random() * 324);
    quoteOBJ = JSON.parse(e.target.response);
    let quote = quoteOBJ[randomNumber].text;
    let author = quoteOBJ[randomNumber].from;
    let quoteText =
        quote.replaceAll("“", "");
    let quoteAuthor = author;
    quoteElement.innerHTML = quoteText;
    authorElement.innerHTML = "Author: " +quoteAuthor;
}

/**
 * Ruft beim Laden der Seite initiate() und read() auf
 */
window.addEventListener('load', () => {
    initiate();
    read();
});