# flyd-keyboard

Keyboard as [Flyd](https://github.com/paldepind/flyd) streams.

## API

### arrows()

```js
var arrows$ = kb.arrows();
arrows$(); // { x: 0, y: 0 }
arrows$ // emits values as arrows are pressed
```

### key()

```js
var enter$ = kb.key('enter');
enter$(); // false
enter$ // emits true or false depending on if enter is held or not
```

### presses()

Emits ASCII codes of pressed keys.

```js
var presses$ = kb.presses();
```

### examples

- [box](http://raine.github.io/flyd-keyboard/box)
- [enter](http://raine.github.io/flyd-keyboard/enter)
- [presses](http://raine.github.io/flyd-keyboard/presses)
