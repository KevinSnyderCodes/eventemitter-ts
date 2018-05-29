# eventemitter-ts

Typed `EventEmitter` classes for use with TypeScript.

## Installation

```sh
npm install eventemitter-ts
```

## Usage

All classes use the same interface as Node's built-in `EventEmitter`, but with generics for strict event types.

### `TypedEventEmitter`

```ts
import { TypedEventEmitter } from 'eventemitter-ts';

interface Events {
    'foo': number;
    'bar': string;
}

const ee = new TypedEventEmitter<Events>();

ee.on('foo', (arg: number) => {}); // OK
ee.on('bar', (arg: string) => {}); // OK
ee.on('baz', (arg: number) => {}); // Error! 'baz' is not a valid event
ee.on('foo', (arg: string) => {}); // Error! 'foo' event does not emit argument of type string
```

### `ProtectedEventEmitter`

```ts
import { ProtectedEventEmitter } from 'eventemitter-ts';

interface Events {
    'foo': number;
    'bar': string;
}

/**
 * Emits 'foo' event once every second.
 */
class MyEventEmitter extends ProtectedEventEmitter<Events> {
    constructor() {
        super();
        setInterval(() => {
            this.protectedEmit('foo', 123);
        }, 1000);
    }
}

const ee = new MyEventEmitter();
ee.on('foo', (arg: number) => {}); // OK
ee.emit('foo', 123); // NOP -- doesn't do anything, always returns false
```
