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

## Design

* The compiler takes code and compiles it to a function that takes a stack and returns a value.
* Technically, the stack sent to the function is 'arguments'.
* { dup dup dup } is anonymous function.
* : duuup { dup dup dup } ; is a named function.
* Use () to call a function with their default number of args.
* Use (integer) to call with that many args.
* So, '1 2 3 4 \ console.log (3)' is equivalent to console.log(4, 3, 2);

## Literals

* Number, String, RegExp, Array, Builtin, Function

### Numbers

* conventional decimal numbers:  0 1 5 137 1.3
* decimal numbers in exponential form:  6.67e-11 -1.127e20
* hexadecimal numbers, for example: 0xFF -0xCCFF 0xabcdef

### Strings

* "Anything between double quotes"

### RegExps

* /blahblah/

### Arrays

* [ space separated [ possibly nested ] values ]

### Builtins

* true false null undefined

### Functions

* { space spearated { possibly nested } functions } 

### Objects

:: Point x y ;

would generate:

: <Point> ( x y -- Point ) \ Point boa ;

: Point? ( o -- bool ) \ Point instanceof ;

: Point.x ( Point -- x ) "x" -> ;
: Point.y ( Point -- y ) "y" -> ;

: Point.x= ( Point x -- Point ) "x" swap set ;
: Point.y= ( Point y -- Point ) "y" swap set ;
