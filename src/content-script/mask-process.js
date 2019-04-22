const isMaskedKeyName = 'isMasked';
const maskEnabledClassName = 'az-mask-enabled';
const sensitiveDataRegex = /^([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})$/;
/* ** Original regex prior to 2019-04-18 **
 * const sensitiveDataRegex = /^\s*([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})|((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))\s*$/;
 *
 */
const sensitiveDataClassName = 'azdev-sensitive';
const blurCss = 'filter: blur(10px); pointer-events: none;';
const tagNamesToMatch = ['DIV']; // uppercase

// add CSS style to blur
const style = document.createElement('style');
style.appendChild(document.createTextNode(''));
document.head.appendChild(style);

style.sheet.insertRule(
  `.${maskEnabledClassName} .azdev-sensitive { ${blurCss} }`
);
style.sheet.insertRule(
  `.${maskEnabledClassName} .fxs-avatarmenu-username { display: none }`
); // hide name instead of blurring
style.sheet.insertRule(
  `.${maskEnabledClassName} input.azc-bg-light { ${blurCss} }`
); // input boxes used for keys, connection strings, etc
style.sheet.insertRule(
  `.${maskEnabledClassName} a.fxs-topbar-reportbug { display:none; }`
); // report a bug button (MS internal only)
style.sheet.insertRule(
  `.${maskEnabledClassName} div.fxs-topbar-internal { display:none; }`
); // "Preview" element in top navigation bar (MS internal only)
style.sheet.insertRule(
  `.${maskEnabledClassName} .fxs-mecontrol-flyout { ${blurCss} }`
); // user account menu

getStoredMaskedStatus(isMasked => {
  isMasked
    ? document.body.classList.add(maskEnabledClassName)
    : document.body.classList.remove(maskEnabledClassName);
});

// add class to elements already on the screen
Array.from(document.querySelectorAll(tagNamesToMatch.join()))
  .filter(e => shouldCheckContent(e) && sensitiveDataRegex.test(e.textContent))
  .forEach(e => e.classList.add(sensitiveDataClassName));

// add class to elements that are added to DOM later
const observer = new MutationObserver(mutations => {
  mutations
    .filter(
      m =>
        shouldCheckContent(m.target, m.type) &&
        sensitiveDataRegex.test(m.target.textContent.trim())
    )
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

function shouldCheckContent(target, mutationType) {
  return (
    mutationType === 'characterData' ||
    (target && tagNamesToMatch.some(tn => tn === target.tagName))
  );
}

function getStoredMaskedStatus(callback) {
  chrome.storage.local.get(isMaskedKeyName, items => {
    const { isMasked } = items;
    if (typeof isMasked !== 'boolean') {
      // default to true
      chrome.storage.local.set({ [isMaskedKeyName]: true }, () =>
        callback(true)
      );
    } else {
      callback(isMasked);
    }
  });
}
