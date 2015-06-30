var stream = require('flyd').stream;
var dropRepeats = require('flyd-droprepeats').dropRepeats;
var dropRepeatsWith = require('flyd-droprepeats').dropRepeatsWith;
var keycode = require('keycode');
var flyd = require('flyd');
var scanMerge = require('flyd-scanmerge');

exports.keysDown = function() {
  var kd = stream();
  var ku = stream();
  var keysDown = scanMerge([
    [kd, function(mem, c) {
      return mem.concat(c);
    }],
    [ku, function(mem, c) {
      return mem.filter(function(x) {
        return x !== c;
      });
    }],
  ], []);

  document.addEventListener('keydown', function(ev) {
    // Prevent repeated events for the same key.
    // dropRepeats can't be used on `kd` because it won't deactivate after
    // `ku` has fired for the same key. Other (heavier?) option would be to
    // do dropRepeatsWith(deepEqual) for keysDown.

    var c = ev.keyCode;
    if (keysDown().indexOf(c) < 0) kd(c);
  }, false);

  document.addEventListener('keyup', function(ev) {
    ku(ev.keyCode);
  }, false);

  return keysDown;
};

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
