var stream = require('flyd').stream;
var dropRepeatsWith = require('flyd-droprepeats').dropRepeatsWith;

module.exports.arrows = function(elem) {
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
