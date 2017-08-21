document.getElementById('toggle-all-masks').addEventListener('click', toggleAllMasks);

const sensitiveDataRegex = /^([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})|((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;
const sensitiveDataClassName = 'azdev-sensitive';
let allMasksEnabled = false;

function toggleAllMasks() {
  console.log('Toggling...');
  allMasksEnabled = !allMasksEnabled;
  allMasksEnabled ? injectEnableAllMasks() : injectDisableAllMasks();
}

function injectEnableAllMasks() {
  let code = enableAllMasks.toString() + '\n enableAllMasks();';
  console.log(code);
  chrome.tabs.executeScript({
    code: code
  });
}

function injectDisableAllMasks() {
  let code = disableAllMasks.toString() + '\n disableAllMasks();';
  console.log(code);
  chrome.tabs.executeScript({
    code: code
  });
}

function enableAllMasks() {
  // classList.add
  const sensitiveDataRegex = /^([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})|((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;
  const sensitiveDataClassName = 'azdev-sensitive';
  Array.from(document.getElementsByTagName('*'))
    .filter(e => sensitiveDataRegex.test(e.textContent))
    .forEach(e => e.classList.add(sensitiveDataClassName));
}

function disableAllMasks() {
  // classList.remove
  const sensitiveDataRegex = /^([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})|((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;
  const sensitiveDataClassName = 'azdev-sensitive';
  Array.from(document.getElementsByTagName('*'))
    .filter(e => sensitiveDataRegex.test(e.textContent))
    .forEach(e => e.classList.remove(sensitiveDataClassName));
}
