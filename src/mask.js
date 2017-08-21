
hideSubscriptions();

function hideSubscriptions() {
    // TODO: find input of type text that contain 'subscriptions' text
    let labels = document.getElementsByTagName('label');
    for (i = 0; i < labels.length; i++) {
        if (labels[i].innerHTML === 'Subscription ID') {
            let containerDiv = labels[i].parentElement.parentElement;

            // Subscription ID value div element
            if (containerDiv.lastElementChild && containerDiv.lastElementChild.firstElementChild) {
                containerDiv.lastElementChild.firstElementChild.style.textShadow = '0 0 10px white';
                containerDiv.lastElementChild.firstElementChild.style.color = 'rgba(0, 0, 0, 0)';
            }
        }
    }
    labels = document.getElementsByClassName('azc-grid-headerlabel');
    for (i = 0; i < labels.length; i++) {
        if (labels[i].innerHTML === 'Subscription ID') {
            let table = document.getElementsByClassName('azc-grid-full')[0];
            for (t = 0; t < table.rows.length; t++) {
                table.rows[t].cells[2].firstChild.style.textShadow = '0 0 10px white';
                table.rows[t].cells[2].firstChild.style.color = 'rgba(0, 0, 0, 0)';
            }
            break;
        }
    }
}