console.log('hiiiiiiiiii')

if (/^https:\/\/[^/]+\.azure\.com\//i.test(document.URL)) {
  const isMaskedKeyName = 'isMasked';
  const maskEnabledClassName = 'az-mask-enabled';
  const sensitiveDataRegex = /^\s*([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})|((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))\s*$/;
  const sensitiveDataClassName = 'azdev-sensitive';
  const blurCss = 'filter: blur(5px);';
  const tagNamesToMatch = ['DIV']; // uppercase

  // add CSS style to blur
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(''));
  document.head.appendChild(style);

  style.sheet.insertRule(`.${maskEnabledClassName} .azdev-sensitive { ${blurCss} }`);
  style.sheet.insertRule(`.${maskEnabledClassName} .fxs-avatarmenu-username { display: none }`); // hide name instead of blurring
  style.sheet.insertRule(`.${maskEnabledClassName} input.azc-bg-light { ${blurCss} }`); // input boxes used for keys, connection strings, etc
  style.sheet.insertRule(`.${maskEnabledClassName} a.fxs-topbar-reportbug { display:none; }`); // report a bug button (MS internal only)

  getStoredMaskedStatus(isMasked => {
    isMasked ? document.body.classList.add(maskEnabledClassName) : document.body.classList.remove(maskEnabledClassName);
  });

  // add class to elements already on the screen
  Array
    .from(document.querySelectorAll(tagNamesToMatch.join()))
    .filter(e => shouldCheckContent(e) && sensitiveDataRegex.test(e.textContent))
    .forEach(e => e.classList.add(sensitiveDataClassName));

  // add class to elements that are added to DOM later
  const observer = new MutationObserver(mutations => {
    mutations
      .filter(m => shouldCheckContent(m.target, m.type) && sensitiveDataRegex.test(m.target.textContent))
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
    return mutationType === 'characterData'
      || target && tagNamesToMatch.some(tn => tn === target.tagName);
  }

  function getStoredMaskedStatus(callback) {
    chrome.storage.local.get(isMaskedKeyName, items => {
      const { isMasked } = items;
      if (typeof isMasked !== 'boolean') {
        // default to true
        chrome.storage.local.set({ [isMaskedKeyName]: true }, () => callback(true));
      } else {
        callback(isMasked);
      }
    });
  }
}

if (/^https:\/\/github\.com\//i.test(document.URL)) {
  const botCommentClassName = 'azdev-bot-comment';
  const botCommentCollapsedClassName = 'azdev-bot-comment-collapsed';
  const botCommentExpandClassName = 'azdev-bot-comment-expand';

  // add CSS style to hide bot comments
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(''));
  document.head.appendChild(style);

  style.sheet.insertRule(`.${botCommentClassName}.${botCommentCollapsedClassName} .edit-comment-hide { display: none; }`);
  style.sheet.insertRule(`.${botCommentClassName}:not(.${botCommentCollapsedClassName}) .${botCommentExpandClassName} { display: none; }`);
  
  // add classes to microsoftdocs bot comments
  const timelineComments = document.querySelectorAll('div.timeline-comment');
  const botNameRegex = /^\s*(opbld|acrolinxatmsft|prmerger)/i;

  timelineComments.forEach(timelineComment => {
    var authorElement = timelineComment.querySelector('.author');
    if (authorElement && botNameRegex.test(authorElement.textContent)) {
      timelineComment.classList.add(botCommentClassName, botCommentCollapsedClassName);
      const div =  document.createElement('div');
      const a = document.createElement('a');
      //a.innerHTML = '<svg aria-hidden="true" class="octicon octicon-unfold" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M11.5 7.5L14 10c0 .55-.45 1-1 1H9v-1h3.5l-2-2h-7l-2 2H5v1H1c-.55 0-1-.45-1-1l2.5-2.5L0 5c0-.55.45-1 1-1h4v1H1.5l2 2h7l2-2H9V4h4c.55 0 1 .45 1 1l-2.5 2.5zM6 6h2V3h2L7 0 4 3h2v3zm2 3H6v3H4l3 3 3-3H8V9z"></path></svg> Expand';;
      a.innerHTML = '...';
      a.href = "#";
      a.addEventListener('click', e => {
        timelineComment.classList.remove(botCommentCollapsedClassName);
        e.preventDefault();
      });
      div.appendChild(a);
      div.classList.add('comment-body', botCommentExpandClassName);
      timelineComment.appendChild(div);
    }
  });
}

