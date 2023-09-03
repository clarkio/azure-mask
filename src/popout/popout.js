let allMasksEnabled = true;

let allMasksCheckbox = document.getElementById('toggle-all-masks');
allMasksCheckbox.addEventListener('click', toggleAllMasks);

chrome.scripting.executeScript(
  {
    function: isAzMaskClassFound,
    allFrames: true
  },
  results => {
    if (results) {
      allMasksEnabled = results[0];
      allMasksCheckbox.checked = allMasksEnabled;
    }
  }
);

function isAzMaskClassFound() {
  return document.body.classList.contains('az-mask-enabled');
}

function toggleAllMasks() {
  allMasksEnabled = !allMasksEnabled;
  chrome.storage.local.set({ isMasked: allMasksEnabled }, () => {
    allMasksEnabled ? injectEnableAllMasks() : injectDisableAllMasks();
  });
}

function injectEnableAllMasks() {
  chrome.scripting.executeScript({
    function: addAzMaskClass,
    allFrames: true
  });
}

function injectDisableAllMasks() {
  chrome.scripting.executeScript({
    function: removeAzMaskClass,
    allFrames: true
  });
}

function addAzMaskClass() {
  return document.body.classList.add('az-mask-enabled');
}

function removeAzMaskClass() {
  return document.body.classList.remove('az-mask-enabled');
}

document.addEventListener('DOMContentLoaded', function () {
  var y = document.getElementById('index_link');
  y.addEventListener('click', openIndex);
});

function openIndex() {
  chrome.tabs.create({ active: true, url: 'https://aka.ms/publicportal' });
}
