```
   _________  ______________  _______
  / ____/   |/_  __/ ____/ / / / ___/  /\___/\
 / /   / /| | / / / /   / / / /\__ \   ) -.- (  $%#@&!
/ /___/ ___ |/ / / /___/ /_/ /___/ /  =\  o  /=   v0.0.7
\____/_/  |_/_/  \____/\____//____/     )   (
  A concatenative language that compiles to JavaScript
```

Just an experiment. Nothing will work. Everything is broken.

## Quick Start

```bash
<clone repo>
npm install
./catcus
catcus> 10 dup * .
=> 100
```

## Features

* Written in and compiles to es6.
* Numbers, strings, single and multi line comments, builtin values like null.
* All js number formats except octal.
* Double quote js strings.
* All js operators.
* Single and multi line js comments.
* All js builtins: true, false, null, undefined, NaN, etc.
* UTF8 identifiers with the same rules as js.
* Simple array support.
* JS interop: `Date` returns the current date as a string, etc.
* `{ dup * }` to define an anonymous function.
* `: duuup dup dup ;` to define a function named duuup.
* Recursion: `: fib dup 1 > { { 1 - fib } { 2 - fib } _bi + } when ;`
* `:: Point x y ;` to define a constructor function with those fields.
* `3 5 \ Point new2` to construct an object.

## TODO

### Features

* Batch compile mode with support for commonjs and browser
* Modules
* Protocols
* Immutable data structures
* Transducers
* CSP
* Standard library
* Bower and / or npm based library management
* Starter template generator

### Cleanup

* Use escodegen instead of string concat.

### Optimizations

* Reduce stack usage where possible.
* Use Google Closure Compiler.

## Ideas

```
/* Builtins */

export function dup(a) {
    return Args([a, a]);
}

/* User function */

EXPORT: add (Number, Number) {
    +
}

3 5 add

/* Translates to */

import rtti from 'rtti';

export function add(a, b) {
    var catcus = Args(arguments, Number, Number);
    var catcus1 = catcus.pop();
    var catcus2 = catcus.pop();
    catcus.push(catcus1 + catcus2);
    return catcus;
}

var args = add(catcus.pop(), catcus.pop());
if (typeof args === 'Args') {
    for (arg of args) {
        catcus.push(arg);
    }
} else if (typeof args !== 'undefined') {
    catcus.push(args);
}

/* Optimizes to */

export function add(x, y) {
    return x + y;
}

var catcus87 = add(catcus85, catcus86);

/* Helpers */

class Args {
    constructor() {
        this.arguments = Array.from(arguments[0]) || [];
        for (var i = 1; i < arguments.length-2; i++) {
            rtti.expect(this.arguments[i-1], arguments[i]);
        }
        this.index = 0;
    }

    pop() {
        if (this.index >= this.arguments.length) {
            throw "stack undeflow";
        }
        return this.arguments[this.index++];
    }

    push(elem) {
        this.arguments.push(elem);
    }

    next() {
        if (this.index >= this.arguments.length) {
            return { done: true };
        }
        return {
            done: false,
            value: this.arguments[this.index++]
        }
    }
}
```
