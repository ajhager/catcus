```
   _________  ______________  _______
  / ____/   |/_  __/ ____/ / / / ___/  /\___/\
 / /   / /| | / / / /   / / / /\__ \   ) -.- (  $%#@&!
/ /___/ ___ |/ / / /___/ /_/ /___/ /  =\  o  /=   v0.0.6
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
* `{ dup * }` to define an anonymous function.
* `: duuup dup dup ;` to define a function named duuup.
* `:: Point x y ;` to define a constructor function with those fields.
* `3 5 \ Point new2` to construct an object.

## TODO

### Features

* `CONSTANT: name value` defines a named value.
* Modules
* Interop
* Protocols
* Transducers
* CSP

### Cleanup

* Use escodegen instead of string concat.

### Optimizations

* Reduce stack usage where possible.
* Use Google Closure Compiler (for optimization and ES6 support).
