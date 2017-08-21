// add CSS style to blur
const style = document.createElement('style');
style.appendChild(document.createTextNode(''));
document.head.appendChild(style);
style.sheet.insertRule(".azdev-sensitive { filter: blur(5px); }");

const sensitiveDataRegex = /^([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})|((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;
const sensitiveDataClassName = 'azdev-sensitive';

// add class to elements already on the screen
Array
  .from(document.getElementsByTagName('*'))
  .filter(e => sensitiveDataRegex.test(e.textContent))
  .forEach(e => e.classList.add(sensitiveDataClassName));

// add class to elements that are added to DOM later
const observer = new MutationObserver(mutations => {
  mutations
    .filter(m => sensitiveDataRegex.test(m.target.textContent))
    .forEach(m => m.target.classList.add('azdev-sensitive'));
});
const config = {
  attributes: false, 
  childList: true, 
  characterData: false, 
  subtree: true
};
observer.observe(document.body, config);