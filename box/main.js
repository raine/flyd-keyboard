const flyd = require('flyd');
const {setInnerHTML, stringify} = require('../utils');
const kb = require('../../');
const {stream} = flyd;
const {__, liftN, curry, pipe, always, merge, props, apply, identity, unapply, zipObj} = require('ramda');

const setPos = curry((elem, left, top) => {
  elem.style.left = left + 'px';
  elem.style.top  = top + 'px';
});

const fps$ = (function() {
  var oldTime = +new Date;
  const s = flyd.stream();
  (function frame(time) {
    window.requestAnimationFrame(frame);
    var d = time - oldTime;
    if (d > 0) s(1000 / d);
    oldTime = time;
  }());
  return s;
}());

const init = always({
  x  : 300,
  y  : 300,
  vx : 0,
  vy : 0
});

const physics = (t, model) => {
  return merge(model, {
    x: model.x + t * model.vx,
    y: model.y + t * model.vy
  });
};

const step = (model, streams) => {
  const [dir, t, space] = streams;
  return move(dir, space, physics(t, model));
};

const move = function(dir, space, model) {
  return merge(model, {
    vx: dir.x * (space ? 0.20 : 0.05),
    vy: dir.y * (space ? 0.20 : 0.05)
  });
};

const arrows$ = kb.arrows();
flyd.on(console.log.bind(console), arrows$);

const box = document.getElementById('box');
const render = pipe(props(['x', 'y']), apply(setPos(box)));
const model$ = flyd.scan(step, init(), liftN(2, unapply(identity))(arrows$, fps$));

flyd.on(render, model$);

const printStreams = pipe(
  unapply(identity),
  zipObj(['arrows', 'box']),
  stringify,
  setInnerHTML(__, document.getElementById('info'))
);

liftN(2, printStreams)(arrows$, model$)
