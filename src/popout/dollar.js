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

  instance.toggle = function() {
    let display = instance.el.style.display;

    if (display === 'none') {
      instance.show();
    } else {
      instance.hide();
    }
  };

  instance.hide = function() {
    instance.el.style.display = 'none';
  };

  instance.show = function() {
    instance.el.style.display = '';
  };

  return instance;
}
