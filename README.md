```
   _________  ______________  _______
  / ____/   |/_  __/ ____/ / / / ___/  /\___/\
 / /   / /| | / / / /   / / / /\__ \   ) -.- (  $%#@&!
/ /___/ ___ |/ / / /___/ /_/ /___/ /  =\  o  /=   v0.0.3
\____/_/  |_/_/  \____/\____//____/     )   (
  A concatenative language that compiles to JavaScript
```

Just an experiment. Nothing works. Everything is broken.

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
* Define inline javascript functions with:

```
JS: helloWorld
	"catcus.push('Hello, ');"
	"catcus.push('World!!');"
	"console.log(catcus.pop() + catcus.pop());"
end
```

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
OBJ: Point x y ;

: <Point> ( x y -- Point ) \ Point boa ;

: Point? ( o -- bool ) \ Point instanceof ;

: Point.x ( Point -- x ) "x" -> ;
: Point.y ( Point -- y ) "y" -> ;

: Point.x= ( Point x -- Point ) "x" swap set ;
: Point.y= ( Point y -- Point ) "y" swap set ;
```
