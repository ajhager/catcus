```
   _________  ______________  _______
  / ____/   |/_  __/ ____/ / / / ___/  /\___/\
 / /   / /| | / / / /   / / / /\__ \   ) -.- (  $%#@&!
/ /___/ ___ |/ / / /___/ /_/ /___/ /  =\  o  /=   v0.0.3
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
* Define inline javascript functions with:

```
JS: helloWorld
	"catcus.push('Hello, ');"
	"catcus.push('World!!');"
	"console.log(catcus.pop() + catcus.pop());"
end
```

where JS: is a parsing word that swallows strings of js code until the 'end'.

## TODO

* `{ dup dup dup }` is an anonymous function.
* `FUNC: duuup { dup dup dup } end` is a named function.
* Use () to call a function with their default number of args.
* Use (integer) to call with that many args.
* So, `'1 2 3 4 \ console.log (3)'` is equivalent to `console.log(4, 3, 2);`
* Regex literals `/catcus[!?]+/`
* Array literals: `[ space separated [ possibly nested ] values ]`
* JS interop
* Objects:

```
OBJ: Point x y end

FUNC: <Point> ( x y -- Point ) \ Point boa end

FUNC: Point? ( o -- bool ) \ Point instanceof end

FUNC: Point.x ( Point -- x ) "x" -> end
FUNC: Point.y ( Point -- y ) "y" -> end

FUNC: Point.x= ( Point x -- Point ) "x" swap set end
FUNC: Point.y= ( Point y -- Point ) "y" swap set end
```
