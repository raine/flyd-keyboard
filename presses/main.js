const flyd = require('flyd');
const {setInnerHTML, stringify} = require('../utils');
const kb = require('../../');
const keycode = require('keycode');
const {stream} = flyd;
const {__, pipe} = require('ramda');

const presses$ = kb.presses();
flyd.on(console.log.bind(console), presses$);

const render = pipe(
  String.fromCharCode,
  (key) => `You pressed <code>"${key}"</code>.`,
  setInnerHTML(__, document.body)
);

flyd.on(render, presses$);
