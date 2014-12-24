var colors = require('colors/safe');
var path = require('path');
var readline = require('readline');

var INTERPRET = 0;
var DEFINITION = 1;
var COMPILE = 2;
var COMMENT = 3;
var QUOTE = 4;
var STRING = 5;
var JSCOMPILE = 6;
var JSDEF = 7;

var runtime = {
	stack: [],
	state: INTERPRET,
	defname: "",
	defstack: [],
	namespace: {
		".": function(v1) {
			log(colors.green, runtime.print(v1));
		}
	},
	push: function(v1) {
		this.stack.push(v1);
	},
	pushArgs: function(args) {
		this.stack.push.apply(this.stack, args);
	},
	pop: function(n) {
		return this.stack.splice(this.stack.length - n, n);
	},
	clear: function() {
		this.stack = [];
	},
	exec: function(quote) {
		var error = execute(quote);
		if (error) {
			log(colors.red, error);
		}
	},
	call: function(word) {
		var argc = word.length
		var argv = this.pop(argc);
		if (argv.length == argc) {
			word.apply(null, argv);
		} else {
			this.pushArgs(argv);
			return "stack underflow";
		}
	},
	print: function(v) {
		if (v === null) {
			return "null";
		}

		if (v === undefined) {
			return "undefined";
		}

		switch (v.constructor) {
			case String:
				return '"' + v + '"';
			case Array:
				return "[" + v.join(' ') + "]";
			default:
				return v;
		}
	},
};

var log = function(color) {
	console.log(color([].slice.call(arguments, 1).join(' ')));
};

var stackToString = function() {
	var output = [];
	for (var i = 0; i < runtime.stack.length; i++) {
		output.push(runtime.print(runtime.stack[i]));
	}
	return output.join(' ');
};

var execute = function(tokens) {
	var tokens = tokens || [];

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];

		switch (runtime.state) {
			case INTERPRET:
				if (runtime.namespace.hasOwnProperty(token)) {
					var word = runtime.namespace[token];

					if (typeof(word) === 'function') {
						var error = runtime.call(word);
						if (error) {
							return error;
						}
					} else {
						var error = runtime.exec(word);
						if (error) {
							return error;
						}
					}
				} else if (token === 'null') {
					runtime.push(null);
				} else if (token === 'undefined') {
					runtime.push(undefined);
				} else if (token === 'true') {
					runtime.push(true);
				} else if (token === 'false') {
					runtime.push(false);
				} else if (!isNaN(token)) {
					runtime.push(Number(token));
				} else if (token === '"') {
					runtime.state = STRING;
				} else if (token === ':') {
					runtime.state = DEFINITION;
				} else if (token === 'JS:') {
					runtime.state = JSDEF;
				} else if (token === '(') {
					runtime.state = COMMENT;
				} else if (token === "[") {
					runtime.state = QUOTE;
				} else {
					return "UNKNOWN TOKEN: " + token;
				}
				break;
			case DEFINITION:
				runtime.defname = token;
				runtime.state = COMPILE;
				break;
			case JSDEF:
				runtime.defname = token;
				runtime.state = JSCOMPILE;
				break;
			case COMPILE:
				if (token === ":") {
					return "TOKEN : INSIDE DEFINITION";
				} else if (token === ";") {
					if (runtime.namespace.hasOwnProperty(runtime.defname)) {
						return "DUPLICATE WORD: " + runtime.defname;
					}
					runtime.namespace[runtime.defname] = runtime.defstack;
					runtime.defstack = [];
					runtime.state = INTERPRET;
				} else {
					runtime.defstack.push(token);
				}
				break;
			case JSCOMPILE:
				if (token === ";") {
					if (runtime.namespace.hasOwnProperty(runtime.defname)) {
						return "DUPLICATE WORD: " + runtime.defname;
					}
					eval('runtime.namespace["' + runtime.defname + '"] = ' + runtime.defstack.join(' '));
					runtime.defstack = [];
					runtime.state = INTERPRET;
				} else {
					runtime.defstack.push(token);
				}
				break;
			case COMMENT:
				if (token === ")") {
					runtime.state = INTERPRET;
				}
				break;
			case STRING:
				if (token === '"') {
					runtime.push(runtime.defstack.join(' '));
					runtime.defstack = [];
					runtime.state = INTERPRET;
				} else {
					runtime.defstack.push(token);
				}
				break;
			case QUOTE:
				if (token === "[") {
					return "TOKEN [ INSIDE QUOTATION";
				} else if (token === "]") {
					runtime.push(runtime.defstack);
					runtime.defstack = [];
					runtime.state = INTERPRET;
				} else {
					runtime.defstack.push(token);
				}
				break;
			default:
				return "UNKNOWN STATE: " + runtime.state;
		}
	}
};

var banner = "   _________  ______________  _______\n" +
	"  / ____/   |/_  __/ ____/ / / / ___/  /\\___/\\\n" +
	" / /   / /| | / / / /   / / / /\\__ \\   ) -.- (  $%^&*!\n" +
	"/ /___/ ___ |/ / / /___/ /_/ /___/ /  =\\  o  /=\n" +
	"\\____/_/  |_/_/  \\____/\\____//____/     )   (\n";

module.exports = function() {
	log(colors.white.bold, banner);

	var stdout = process.stdout;
	var stdin = process.openStdin();
	var repl = readline.createInterface(stdin, stdout);

	var fs = require('fs');
	var kernel = fs.readFileSync(path.dirname(__dirname) + '/lib/kernel.cus', 'utf8');
	runtime.exec(kernel.match(/\S+/g));

	repl.on('close', function() {
		stdin.destroy();
	});

	repl.on('line', function(line) {
		runtime.exec(line.match(/\S+/g));

		if (runtime.state === INTERPRET) {
			repl.setPrompt('catcus> ');
			log(colors.white.bold, '=>', stackToString());
		} else {
			repl.setPrompt(colors.yellow('     .. '), 8);
		}

		repl.prompt();
	});

	repl.setPrompt('catcus> ');
	repl.prompt();
};
