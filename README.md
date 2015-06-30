# flyd-keyboard

Keyboard as [Flyd](https://github.com/paldepind/flyd) streams.

## API

### `arrows()`

```js
var arrows$ = kb.arrows();
arrows$(); // { x: 0, y: 0 }
arrows$ // emits values as arrows are pressed
```

### `key()`

```js
var enter$ = kb.key('enter');
enter$(); // false
enter$ // emits true or false depending on if enter is held or not
```

### `presses()`

Emits ASCII codes of pressed keys.

```js
var presses$ = kb.presses();
```

### `keysDown()`

Emits a list of keys as keycodes that are currently held down.

```js
var keysDown$ = kb.keysDown();
```

### `keyDowns()`

Emits keydown events as keycodes.

```js
var keyDowns = kb.keyDowns();
```

### examples

- [box](http://raine.github.io/flyd-keyboard/box)
- [enter](http://raine.github.io/flyd-keyboard/enter)
- [presses](http://raine.github.io/flyd-keyboard/presses)
- [keysdown](http://raine.github.io/flyd-keyboard/keysdown)
