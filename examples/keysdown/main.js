const flyd = require('flyd');
const {setInnerHTML, stringify} = require('../utils');
const kb = require('../../');
const keycode = require('keycode');
const {stream} = flyd;
const {__, pipe, map, replace} = require('ramda');

const keysDown$ = kb.keysDown();

keysDown$.map(console.log.bind(console));

const render = pipe(
  map(keycode),
  stringify,
  replace(/"/g, ''),
  (list) => `You are holding down <code>${list}</code>.`,
  setInnerHTML(__, document.body)
);

flyd.on(render, keysDown$);
