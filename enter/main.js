const flyd = require('flyd');
const kb = require('../../');
const {stream} = flyd;
const {__, curry, pipe, partialRight, T, add, liftN, join} = require('ramda');

const setProp = curry((prop, value, obj) => obj[prop] = value);
const setInnerHTML = setProp('innerHTML');
const stringify = partialRight(JSON.stringify, null, 2);

const enter$ = kb.key('enter');
const times$ = flyd.scan(add, 0, enter$.map(Number));
// flyd.on(console.log.bind(console), enter$)

const plural = (word, n) => word + (n === 1 ? '' : 's');
const render = pipe(
  (state, n) => [
    `Enter is ${state ? 'down' : 'up'}.`,
    `Enter has been pressed ${n} ${plural('time', n)}.`,
  ],
  join('<br>'),
  setInnerHTML(__, document.body)
);

liftN(2, render)(enter$, times$);
