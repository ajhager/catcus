```
   _________  ______________  _______
  / ____/   |/_  __/ ____/ / / / ___/  /\___/\
 / /   / /| | / / / /   / / / /\__ \   ) -.- (  $%#@&!
/ /___/ ___ |/ / / /___/ /_/ /___/ /  =\  o  /=   v0.0.4
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
* { dup * } to define, potentially nested, anonymous functions.
* Define inline javascript functions with:

```
JS: helloWorld
	"catcus.push('Hello, ');"
	"catcus.push('World!!');"
	"console.log(catcus.pop() + catcus.pop());" ;
```

where JS: is a parsing word that swallows strings of js code until a ';'.

## TODO

* `DEF: name value` defines a named value.
* `DEF: duuup { dup dup dup }` would define a function.
* `DEF: GL_COLOR_BUFFER_BIT 16384` would define a constant.
* Array literals: `[ space separated [ possibly nested ] values ]`
* Objects definitions.
* Regex literals `/catcus[!?]+/`
* JS interop
