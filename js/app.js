/**
 * start.js
 * Init app
 * @ndaidong
 */

(() => {

  'use strict';

  var doc = window.doc;
  var tw = window.TypeWritter;

  doc.ready(() => {
    setTimeout(() => {
      tw.start({
        containerId: 'typingArea',
        extractClass: 'sentence',
        cursorClass: 'cursor'
      });
    }, 1000);
  });
})();
