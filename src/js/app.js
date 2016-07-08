/**
 * start.js
 * Init app
 * @ndaidong
 */

(() => {

  var doc = window.doc;
  var tw = window.TypeWritter;

  doc.ready(() => {
    if (doc.get('typingArea')) {
      setTimeout(() => {
        tw.start({
          containerId: 'typingArea',
          extractClass: 'sentence',
          cursorClass: 'cursor'
        });
      }, 3000);
    }
  });
})();
