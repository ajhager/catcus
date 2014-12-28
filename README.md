```
   _________  ______________  _______
  / ____/   |/_  __/ ____/ / / / ___/  /\___/\
 / /   / /| | / / / /   / / / /\__ \   ) -.- (  $%#@&!
/ /___/ ___ |/ / / /___/ /_/ /___/ /  =\  o  /=   v0.0.2
\____/_/  |_/_/  \____/\____//____/     )   (
  A concatenative language that compiles to JavaScript
```

## Quick Start

```bash
<clone repo>
npm install
./catcus
catcus> 10 { dup * } call
=> 100
catcus> exit
```

## Todo

* Separate parsing and executing in prep for compilation.
* Add module system with IN: and USE:
* Create PARSE: word and parsing module so parsing can be defined in catcus.
* Parsing should produce a list of nested callables.
* JS: parsing word should just take the function body.
* Add ability to access javascript objects / values in the global scope.
* Should the :: parser generate a constructor and accessors? or should that be ::+
* Start using escodegen for javascript output, and use it for compilation.
* Compile to javascript that can be used in node, commonjs, normal browser, etc.
* Support sourcemaps.
* Add test and bench modules.
* Add more examples.
* Attempt to parse strings like numbers instead of a with parsing word.
* Add type system.
