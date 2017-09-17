function $(selector) {
  let instance = {};

  instance.el = document.querySelector(selector);
  instance.on = function(event, callback) {
    this.el.addEventListener(event, callback);
  };
  instance.val = function(value) {
    if (value) {
      this.el.value = value;
    } else return this.el.value;
  };
  instance.html = function(value) {
    if (value) {
      this.el.textContent = value;
    } else return this.el.textContent;
  };

  return instance;
}

let $urlToShorten = $('#url-to-shorten');
$urlToShorten.on('keyup', handleKeyUp);

let $alias = $('#alias');
$alias.on('blur', saveSettings);

let $event = $('#event');
$event.on('blur', saveSettings);

let $channel = $('#channel');
$channel.on('blur', saveSettings);

let $shortenedLink = $('#shortenedLink');
let $longLink = $('#longLink');

let $shortenButton = $('#shortenButton');
$shortenButton.on('click', shortenURL);

getSettings();

function handleKeyUp(e) {
  if (e.which === 13) {
    shortenURL();
  }
}

function shortenURL() {
  let separator = $urlToShorten.val().indexOf('?') > 0 ? '&' : '?';

  let fullURL = `${$urlToShorten.val()}${separator}WT.mc_id=${$event.val()}-${$channel.val()}-${$alias.val()}`;

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
      $shortenedLink.el.href = `http://${json.url}`;
      $shortenedLink.html(json.url);

      $longLink.html(fullURL);

      // save settings
      saveSettings();

      // copy the URL to clipboard
      $urlToShorten.val(json.url);

      $urlToShorten.el.focus();
      $urlToShorten.el.select();

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
      $alias.val(result.alias || '');
      $event.val(result.event || '');
      $channel.val(result.channel || '');
      $shortenedLink.html(result.shortenedLink || '');
      $shortenedLink.el.href = `http://${result.shortenedLink}` || '';
      $longLink.html(result.longLink || '');
    }
  );

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    $urlToShorten.val(tabs[0].url);
  });
}

function saveSettings(alias, event, channel, shortenedLink, longLink) {
  chrome.storage.sync.set({ alias: $alias.val() || '' });
  chrome.storage.sync.set({ event: $event.val() || '' });
  chrome.storage.sync.set({ channel: $channel.val() || '' });
  chrome.storage.sync.set({ shortenedLink: $shortenedLink.html() || '' });
  chrome.storage.sync.set({ longLink: $longLink.html() });
}
