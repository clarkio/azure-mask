
// This runs as a "background process" and can handle
// sharing messages between the "content scripts" and "popup"

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