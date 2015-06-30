const {curry, partialRight} = require('ramda');

const setProp = curry((prop, value, obj) => obj[prop] = value);
const setInnerHTML = setProp('innerHTML');
const stringify = partialRight(JSON.stringify, null, 2);

module.exports = {
  setProp, setInnerHTML, stringify
};
