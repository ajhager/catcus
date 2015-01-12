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

* Batch compile mode with support for commonjs and browser.
* Modules
* Protocols
* Transducers
* CSP

### Cleanup

* Use escodegen instead of string concat.

### Optimizations

* Reduce stack usage where possible.
* Use Google Closure Compiler (for optimization and ES6 support).
