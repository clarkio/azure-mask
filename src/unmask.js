unhideSubscriptions();

function unhideSubscriptions() {
    let labels = document.getElementsByTagName('label');
    for (i = 0; i < labels.length; i++) {
        if (labels[i].innerHTML === "Subscription ID") {
            console.log('Found one!', labels[i]);
            let containerDiv = labels[i].parentElement.parentElement;
            let elementToUnmask = containerDiv.lastElementChild.firstElementChild;
            if (elementToUnmask.style.color || elementToUnmask.style.textShadow) {
                elementToUnmask.style.color = null;
                elementToUnmask.style.textShadow = null;
            }
        }
    }
    labels = document.getElementsByClassName('azc-grid-headerlabel');
    for (i = 0; i < labels.length; i++) {
        if (labels[i].innerHTML === "Subscription ID") {
            console.log('Found a table!', labels[i]);
            let table = document.getElementsByClassName('azc-grid-full')[0];
            for (t = 0; t < table.rows.length; t++) {
                if (table.rows[t].cells[2].firstChild.style.color) {
                    table.rows[t].cells[2].firstChild.style.color = null;
                    table.rows[t].cells[2].firstChild.style.textShadow = null;
                }
            }
            break;
        }
    }
}