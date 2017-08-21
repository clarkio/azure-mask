
console.log('!!!!!!!!');
let isMasked = false;
let isEmailMasked = false;

let observer = new MutationObserver(function (mutations) {
    checkMasks();
});

// configuration of the observer
let config = {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true
};
// document.addEventListener('DOMContentLoaded', function () {
chrome.runtime.sendMessage({ status: "retrieve" }, function (response) {
    console.log(response);
    isMasked = response.isMasked;
    isEmailMasked = response.isEmailMasked;
    observer = new MutationObserver(function (mutations) {
        checkMasks();
    });
    let mainNode = document.getElementById('web-container');
    if (mainNode) {
        observer.observe(mainNode, config);
    }
});
// });

function checkMasks() {
    chrome.runtime.sendMessage({ status: "retrieve" }, function (response) {
        console.log(response);
        isMasked = response.isMasked;
        isEmailMasked = response.isEmailMasked;
        if (isMasked) {
            hideSubscriptions();
        }
        if (isEmailMasked) {
            hideEmail();
        }
    });
}

function hideSubscriptions() {
    // let labels = document.getElementsByClassName('fxc-essentials-label');
    let labels = document.getElementsByTagName('label');
    for (i = 0; i < labels.length; i++) {
        if (labels[i].innerHTML === "Subscription ID") {
            console.log('Found one!', labels[i]);
            let containerDiv = labels[i].parentElement.parentElement;
            // containerDiv.children[1].textShadow = '0 0 10px white';
            // containerDiv.children[1].color = 'rgba(0, 0, 0, 0)';
            // containerDiv.style.textShadow = '0 0 10px white';
            // containerDiv.style.color = 'rgba(0, 0, 0, 0)';

            // Subscription ID value div element
            if (containerDiv.lastElementChild && containerDiv.lastElementChild.firstElementChild) {
                containerDiv.lastElementChild.firstElementChild.style.textShadow = '0 0 10px white';
                containerDiv.lastElementChild.firstElementChild.style.color = 'rgba(0, 0, 0, 0)';
            }
            // if (containerDiv.style.display !== "none") {
            //     containerDiv.style.display = "none";
            // }
        }
    }
    labels = document.getElementsByClassName('azc-grid-headerlabel');
    for (i = 0; i < labels.length; i++) {
        if (labels[i].innerHTML === "Subscription ID") {
            console.log('Found a table!', labels[i]);
            let table = document.getElementsByClassName('azc-grid-full')[0];
            for (t = 0; t < table.rows.length; t++) {
                // table.rows[t].cells[2].firstChild.style.display = "none";
                table.rows[t].cells[2].firstChild.style.textShadow = '0 0 10px white';
                table.rows[t].cells[2].firstChild.style.color = 'rgba(0, 0, 0, 0)';
            }
            break;
        }
    }
}

function hideEmail() {
    let emailLabel = document.getElementsByClassName('fxs-avatarmenu-tenant')[0];
    console.log(emailLabel);
    emailLabel.style.display = 'none';
}