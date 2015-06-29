# flyd-keyboard

Keyboard as [Flyd](https://github.com/paldepind/flyd) streams.

__Arrows__

```js
var kb = require('flyd-keyboard')
var arrows$ = kb.arrows();
arrows$(); // { x: 0, y: 0 }
arrows$ // emits values as arrows are pressed
```

__Key__

```js
var kb = require('flyd-keyboard')
var enter$ = kb.key('enter');
enter$(); // false
enter$ // emits true or false depending on if enter is held or not
```

### examples

- [box](http://raine.github.io/flyd-keyboard/box)
- [enter](http://raine.github.io/flyd-keyboard/enter)
