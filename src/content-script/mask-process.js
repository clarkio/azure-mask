const isMaskedKeyName = 'isMasked';
const maskEnabledClassName = 'az-mask-enabled';
const sensitiveDataRegex = /^\s*([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})|((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))\s*$/;
const sensitiveDataClassName = 'azdev-sensitive';

// add CSS style to blur
const style = document.createElement('style');
style.appendChild(document.createTextNode(''));
document.head.appendChild(style);
style.sheet.insertRule(`.${maskEnabledClassName} .azdev-sensitive { filter: blur(5px); }`);
style.sheet.insertRule("a.fxs-topbar-reportbug { display:none; }");

getStoredMaskedStatus(isMasked => {
  isMasked ? document.body.classList.add(maskEnabledClassName) : document.body.classList.remove(maskEnabledClassName);
});

// add class to elements already on the screen
Array
  .from(document.getElementsByTagName('*'))
  .filter(e => sensitiveDataRegex.test(e.textContent))
  .forEach(e => e.classList.add(sensitiveDataClassName));

// add class to elements that are added to DOM later
const observer = new MutationObserver(mutations => {
  mutations
    .filter(m => sensitiveDataRegex.test(m.target.textContent))
    .forEach(m => {
      const node = m.type === 'characterData' ? m.target.parentNode : m.target;
      if (node.classList) {
        node.classList.add('azdev-sensitive');
      }
    });
});
const config = {
  attributes: false,
  characterData: true,
  childList: true,
  subtree: true
};
observer.observe(document.body, config);


function getStoredMaskedStatus(callback) {
  chrome.storage.local.get(isMaskedKeyName, items => {
    const {isMasked} = items;
    // default to true
    if (typeof isMasked !== 'boolean') {
      chrome.storage.local.set({ [isMaskedKeyName]: true }, () => callback(true));
    } else {
      callback(isMasked);
    }
  });
}
