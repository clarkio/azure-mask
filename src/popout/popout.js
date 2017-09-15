const sensitiveDataRegex = /^([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})|((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;
const sensitiveDataClassName = 'azdev-sensitive';
let allMasksEnabled = true;

let allMasksCheckbox = document.getElementById('toggle-all-masks');
allMasksCheckbox.addEventListener('click', toggleAllMasks);

let shortenURLInput = document.getElementById('url-to-shorten');
shortenURLInput.addEventListener('keyup', handleKeyUp);

let aliasInput = document.getElementById('alias');
aliasInput.addEventListener('keyup', saveSettings);

let eventInput = document.getElementById('event');
eventInput.addEventListener('keyup', saveSettings);

let channelInput = document.getElementById('channel');
eventInput.addEventListener('keyup', saveSettings);

let shortenedLinkAnchor = document.getElementById('shortenedLink');
let longLinkSpan = document.getElementById('longLink');

let shortenButton = document.getElementById('shortenButton');
shortenButton.addEventListener('click', shortenURL);

getSettings();

chrome.tabs.executeScript(
  {
    code: "document.body.classList.contains('az-mask-enabled');",
    allFrames: false
  },
  results => {
    if (results) {
      allMasksEnabled = results[0];
      allMasksCheckbox.checked = allMasksEnabled;
    }
  }
);

function toggleAllMasks() {
  console.log('Toggling...');
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

function handleKeyUp(e) {
  if (e.which === 13) {
    shortenURL();
  }
}

function shortenURL() {
  let fullURL = `${shortenURLInput.value}?WT.mc_id=${aliasInput.value}-${channelInput.value}-${eventInput.value}`;

  fetch('http://cda.ms/save', {
    method: 'POST',
    body: JSON.stringify({
      url: fullURL
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      shortenedLinkAnchor.href = `http://${json.url}`;
      shortenedLinkAnchor.textContent = json.url;

      longLinkSpan.textContent = fullURL;

      // save settings
      saveSettings();

      // copy the URL to clipboard
      shortenURLInput.value = json.url;

      shortenURLInput.focus();
      shortenURLInput.select();

      document.execCommand('copy');
    });
}

function getSettings() {
  chrome.storage.sync.get(
    [
      'alias',
      'channel',
      'event',
      'shortenedLink',
      'shortenedLinkHref',
      'longLink'
    ],
    result => {
      aliasInput.value = result.alias || '';
      eventInput.value = result.event || '';
      channelInput.value = result.channel || '';
      shortenedLinkAnchor.textContent = result.shortenedLink || '';
      shortenedLinkAnchor.href = result.shortenedLinkHref || '';
      longLinkSpan.textContent = result.longLink || '';
    }
  );

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    shortenURLInput.value = tabs[0].url;
  });
}

function saveSettings() {
  let alias = aliasInput.value || '';
  let event = eventInput.value || '';
  let channel = channelInput.value || '';
  let shortenedLink = shortenedLinkAnchor.textContent || '';
  let shortenedLinkHref = shortenedLinkAnchor.href;
  let longLink = longLinkSpan.textContent || '';

  chrome.storage.sync.set({ alias: alias });
  chrome.storage.sync.set({ event: event });
  chrome.storage.sync.set({ channel: channel });
  chrome.storage.sync.set({ shortenedLink: shortenedLink });
  chrome.storage.sync.set({ shortenedLinkHref: shortenedLinkHref });
  chrome.storage.sync.set({ longLink: longLink });
}
