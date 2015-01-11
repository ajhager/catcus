```
   _________  ______________  _______
  / ____/   |/_  __/ ____/ / / / ___/  /\___/\
 / /   / /| | / / / /   / / / /\__ \   ) -.- (  $%#@&!
/ /___/ ___ |/ / / /___/ /_/ /___/ /  =\  o  /=   v0.0.5
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
* { dup * } to define, potentially nested, anonymous functions.
* Define functions: FUNC: duup dup dup ;
* Define inline javascript functions:

```
JS: helloWorld
	"catcus.push('Hello, ');"
	"catcus.push('World!!');"
	"console.log(catcus.pop() + catcus.pop());" ;
```

where JS: is a parsing word that swallows strings of js code until a ';'.

## TODO

* Array literals: `[ space separated [ possibly nested ] values ]`
* `CONSTANT: name value` defines a named value.
* Objects definitions.
* Regex literals `/catcus[!?]+/`
* JS interop
