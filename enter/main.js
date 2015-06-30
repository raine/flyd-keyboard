const flyd = require('flyd');
const {setInnerHTML} = require('../utils');
const kb = require('../../');
const {__, pipe, add, liftN, join} = require('ramda');

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
