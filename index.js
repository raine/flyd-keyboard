var stream = require('flyd').stream;
var dropRepeats = require('flyd-droprepeats').dropRepeats;
var dropRepeatsWith = require('flyd-droprepeats').dropRepeatsWith;
var keycode = require('keycode');

exports.presses = function() {
  var presses = stream();

  document.addEventListener('keypress', function(ev) {
    presses(ev.keyCode);
  }, false);
  
  return presses;
};

exports.key = function(key) {
  var ks = stream(false);
  var code = keycode(key);

  document.addEventListener('keydown', function(ev) {
    if (ev.keyCode === code) ks(true);
  }, false);

  document.addEventListener('keyup', function(ev) {
    if (ev.keyCode === code) ks(false);
  }, false);

  return dropRepeats(ks);
};

exports.arrows = function(elem) {
  var l = stream(false);
  var r = stream(false);
  var u = stream(false);
  var d = stream(false);

  document.addEventListener('keydown', function(ev) {
    if      (ev.keyCode === 37) l(true);
    else if (ev.keyCode === 39) r(true);
    else if (ev.keyCode === 38) u(true);
    else if (ev.keyCode === 40) d(true);
  }, false);

  document.addEventListener('keyup', function(ev) {
    if      (ev.keyCode === 37) l(false);
    else if (ev.keyCode === 39) r(false);
    else if (ev.keyCode === 38) u(false);
    else if (ev.keyCode === 40) d(false);
  }, false);


  return dropRepeatsWith(eqCoords, stream([l, r, u, d], function() {
    return {
      x: l() ? -1 : r() ? 1 : 0,
      y: u() ? -1 : d() ? 1 : 0
    };
  }));
};

function eqCoords(a, b) {
  return a && b && a.x === b.x && a.y === b.y;
};
