(function() {
  let $main = $('#main');
  let $settings = $('#settings');
  let $shortener = $('#shortener');

  let $settingsLink = $('#settingsLink');
  $settingsLink.on('click', toggleSettings);

  let $backLink = $('#backLink');
  $backLink.on('click', toggleSettings);

  let $alias = $('#alias');

  function toggleSettings() {
    $alias.val().trim() !== '' ? $shortener.show() : $shortener.hide();

    $main.toggle();
    $settings.toggle();
  }
})();
