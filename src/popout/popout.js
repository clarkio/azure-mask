let allMasksEnabled = true;

let allMasksCheckbox = document.getElementById('toggle-all-masks');
allMasksCheckbox.addEventListener('click', toggleAllMasks);

chrome.tabs.executeScript(
  {
    code: "document.body.classList.contains('az-mask-enabled');",
    allFrames: true
  },
  results => {
    if (results) {
      allMasksEnabled = results[0];
      allMasksCheckbox.checked = allMasksEnabled;
    }
  }
);

function toggleAllMasks() {
  allMasksEnabled = !allMasksEnabled;
  chrome.storage.local.set({ isMasked: allMasksEnabled }, () => {
    allMasksEnabled ? injectEnableAllMasks() : injectDisableAllMasks();
  });
}

function injectEnableAllMasks() {
  chrome.tabs.executeScript({
    code: "document.body.classList.add('az-mask-enabled');",
    allFrames: true
  });
}

function injectDisableAllMasks() {
  chrome.tabs.executeScript({
    code: "document.body.classList.remove('az-mask-enabled');",
    allFrames: true
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var y = document.getElementById('index_link');
  y.addEventListener('click', openIndex);
});

function openIndex() {
  chrome.tabs.create({ active: true, url: 'https://aka.ms/publicportal' });
}
