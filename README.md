# flyd-keyboard

Keyboard as [Flyd](https://github.com/paldepind/flyd) streams.

__Arrows__

```js
var kb = require('flyd-keyboard')
var arrows$ = kb.arrows();
arrows$() // { x: 0, y: 0 }
arrows$.map(function() {
  // emits values as arrows are pressed
});
```

[Example](http://raine.github.io/flyd-keyboard/box)
