const EMAIL_MASK_ID = 'isEmailMasked';
const SUB_MASK_ID = 'isMasked';

function toggleMask() {
    console.log('toggling mask...');
    let isMasked = document.getElementById('toggle-mask');

    if (isMasked.checked === true) {
        chrome.storage.local.set({ 'isMasked': true }, function () {
            console.log('Saved to mask');
        });
        chrome.tabs.executeScript({
            file: 'mask.js'
        });
    } else {
        chrome.storage.local.set({ 'isMasked': false }, function () {
            console.log('Saved to not mask');
        });
        chrome.tabs.executeScript({
            file: 'unmask.js'
        });
    }
}

function toggleEmailMask() {
    let isEmailMasked = document.getElementById('toggle-email-mask');

    if (isEmailMasked.checked === true) {
        chrome.storage.local.set({ 'isEmailMasked': true }, function () {
            console.log('Saved to mask');
        });
        chrome.tabs.executeScript({
            file: 'maskEmail.js'
        });
    } else {
        chrome.storage.local.set({ 'isEmailMasked': false }, function () {
            console.log('Saved to not mask');
        });
        chrome.tabs.executeScript({
            file: 'unmaskEmail.js'
        });
    }
}

chrome.runtime.onMessage.addListener(messageListener);

let responseData = {
    isMasked: false,
    isEmailMasked: false
};

function messageListener(request, sender, sendResponse) {
    chrome.storage.local.get('isMasked', function (data) {
        if (data === undefined) {
            responseData.isMasked = false;
        } else {
            responseData.isMasked = data.isMasked;
        }
        chrome.storage.local.get('isEmailMasked', function (data) {
            if (data === undefined) {
                responseData.isEmailMasked = false;
                sendResponse(responseData);
            } else {
                responseData.isEmailMasked = data.isEmailMasked;
                sendResponse(responseData);
            }
        });
    });
    return true;
}

(function () {
    console.log('Running!');

    document.getElementById('toggle-mask').addEventListener('click', toggleMask);
    document.getElementById('toggle-mask').addEventListener('onchange', function (e) {
        console.log('triggered automatically');
        toggleMask();
    });

    document.getElementById('toggle-email-mask').addEventListener('click', toggleEmailMask);
    document.getElementById('toggle-email-mask').addEventListener('onchange', function (e) {
        console.log('triggered automatically');
        toggleEmailMask();
    });

    chrome.storage.local.get('isMasked', function (data) {
        if (data === undefined) {
            console.log('Nothing saved before');
            chrome.storage.local.set({ 'isMasked': false }, function () {
                console.log('Saved to not mask');
            });
        } else {
            console.log('Found saved preferences');
            console.log(data);
            let isMasked = document.getElementById('toggle-mask');
            console.log('setting the check box to: ', data.isMasked);
            isMasked.checked = data.isMasked;
        }
    });
    chrome.storage.local.get(EMAIL_MASK_ID, function (data) {
        if (data === undefined) {
            console.log('Nothing saved before');
            chrome.storage.local.set({ EMAIL_MASK_ID: false }, function () {
                console.log('Saved to not mask');
            });
        } else {
            console.log('Found saved preferences');
            console.log(data);
            let isMasked = document.getElementById('toggle-email-mask');
            console.log('setting the check box to: ', data.isEmailMasked);
            isMasked.checked = data.isEmailMasked;
        }
    });
})();