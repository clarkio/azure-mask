
let isMasked = false;
let isEmailMasked = false;

let observer = new MutationObserver(function (mutations) {
    checkMasks();
});

let observerConfig = {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true
};

// Get the stored settings on whether to mask or not
chrome.runtime.sendMessage({ status: "retrieve" }, function (response) {
    console.log(response);
    isMasked = response.isMasked;
    isEmailMasked = response.isEmailMasked;
    let mainNode = document.getElementById('web-container');
    if (mainNode) {
        observer.observe(mainNode, observerConfig);
    }
});

function checkMasks() {
    // Double check if the settings have changed whether to mask or not
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
    let labels = document.getElementsByTagName('label');
    for (i = 0; i < labels.length; i++) {
        if (labels[i].innerHTML === "Subscription ID") {
            console.log('Found one!', labels[i]);
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
        if (labels[i].innerHTML === "Subscription ID") {
            let table = document.getElementsByClassName('azc-grid-full')[0];
            for (t = 0; t < table.rows.length; t++) {
                table.rows[t].cells[2].firstChild.style.textShadow = '0 0 10px white';
                table.rows[t].cells[2].firstChild.style.color = 'rgba(0, 0, 0, 0)';
            }
            break;
        }
    }
}

function hideEmail() {
    let emailLabel = document.getElementsByClassName('fxs-avatarmenu-tenant')[0];
    emailLabel.style.textShadow = '0 0 10px white';
    emailLabel.style.color = 'rgba(0, 0, 0, 0)';
}