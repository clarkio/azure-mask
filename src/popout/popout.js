const sensitiveDataRegex = /^([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})|((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;
const sensitiveDataClassName = 'azdev-sensitive';
let allMasksEnabled = true;

let allMasksCheckbox = document.getElementById('toggle-all-masks');
allMasksCheckbox.addEventListener('click', toggleAllMasks);

function toggleAllMasks() {
  console.log('Toggling...');
  allMasksEnabled = !allMasksEnabled;
  allMasksEnabled ? injectEnableAllMasks() : injectDisableAllMasks();
}

function injectEnableAllMasks() {
  chrome.tabs.executeScript({
    code: 'document.body.classList.add(\'az-mask-enabled\');',
    allFrames: true
  });
}

function injectDisableAllMasks() {
  chrome.tabs.executeScript({
    code: 'document.body.classList.remove(\'az-mask-enabled\');',
    allFrames: true
  });
}
