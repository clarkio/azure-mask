
hideSubscriptions();

function hideSubscriptions() {
    // TODO: find input of type text that contain 'subscriptions' text
    // let labels = document.getElementsByClassName('fxc-essentials-label');
    let labels = document.getElementsByTagName('label');
    for (i = 0; i < labels.length; i++) {
        if (labels[i].innerHTML === 'Subscription ID') {
            console.log('Found one!', labels[i]);
            let containerDiv = labels[i].parentElement.parentElement;
            // containerDiv.style = 'text-shadow: 0 0 10px white; color: rgba(0, 0, 0, 0);';

            // containerDiv.children[1].textShadow = '0 0 10px white';
            // containerDiv.children[1].color = 'rgba(0, 0, 0, 0)';
            // containerDiv.style.textShadow = '0 0 10px white';
            // containerDiv.style.color = 'rgba(0, 0, 0, 0)';

            // Subscription ID value div element
            if (containerDiv.lastElementChild && containerDiv.lastElementChild.firstElementChild) {
                containerDiv.lastElementChild.firstElementChild.style.textShadow = '0 0 10px white';
                containerDiv.lastElementChild.firstElementChild.style.color = 'rgba(0, 0, 0, 0)';
            }

            // if (containerDiv.style.display !== 'none') {
            //     containerDiv.style.display = 'none';
            // }
        }
    }
    labels = document.getElementsByClassName('azc-grid-headerlabel');
    for (i = 0; i < labels.length; i++) {
        if (labels[i].innerHTML === 'Subscription ID') {
            console.log('Found a table!', labels[i]);
            let table = document.getElementsByClassName('azc-grid-full')[0];
            for (t = 0; t < table.rows.length; t++) {
                // table.rows[t].cells[2].firstChild.style.display = 'none';
                table.rows[t].cells[2].firstChild.style.textShadow = '0 0 10px white';
                table.rows[t].cells[2].firstChild.style.color = 'rgba(0, 0, 0, 0)';
                // table.rows[t].cells[2].firstChild.classList.add('foreverblur');
            }
            break;
        }
    }
}