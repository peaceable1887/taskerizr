/**
 * @author Frederic Karliczek
 * @author Felix Hansmann
 */
function showOverlay(overlaySelector) {
    const overlay = document.querySelector(overlaySelector);
    overlay.style.visibility = "visible";
}

function closeOverlay(overlaySelector) {
    const overlay = document.querySelector(overlaySelector);
    overlay.style.visibility = "hidden";
}