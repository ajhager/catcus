var colors = require('colors/safe');
var path = require('path');
var readline = require('readline');

var pp = function(v) {
	if (v === null) {
		return "null";
	}

	if (v === undefined) {
		return undefined;
	}

	switch (v.constructor) {
		case String:
			return '"' + v + '"';
		case Array:
			return "[" + v.join(' ') + "]";
		default:
			return v;
	}
};

var log = function(color) {
	console.log(color([].slice.call(arguments, 1).join(' ')));
};

var INTERPRET = 0;
var DEFINITION = 1;
var COMPILE = 2;
var COMMENT = 3;
var QUOTE = 4;
var STRING = 5;

var state = INTERPRET;

var stack = [];
var P = function(v) {
	stack.push(v);
};
var name = "";
var defstack = [];

var dict = {
	".": function(v1) {
		log(colors.green, pp(v1));
	},
	"+": function(v1, v2) {
		P(v1 + v2);
	},
	"-": function(v1, v2) {
		P(v1 - v2);
	},
	"*": function(v1, v2) {
		P(v1 * v2);
	},
	"/": function(v1, v2) {
		P(v1 / v2);
	},
	"%": function(v1, v2) {
		P(v1 % v2);
	},
	"==": function(v1, v2) {
		P(v1 === v2);
	},
	"!=": function(v1, v2) {
		P(v1 !== v2);
	},
	"<": function(v1, v2) {
		P(v1 < v2);
	},
	"<=": function(v1, v2) {
		P(v1 <= v2);
	},
	">": function(v1, v2) {
		P(v1 > v2);
	},
	">=": function(v1, v2) {
		P(v1 >= v2);
	},
	"swap": function(v1, v2) {
		P(v2);
		P(v1);
	},
	"dup": function(v1) {
		P(v1);
		P(v1);
	},
	"dip": function(v1, v2) {
		exec(v2);
		P(v1);
	},
	"if": function(v1, v2, v3) {
		if (v1) {
			exec(v2);
		} else {
			exec(v3);
		}
	},
	"over": function(v1, v2) {
		P(v1);
		P(v2);
		P(v1);
	},
	"tuck": function(v1, v2) {
		P(v2);
		P(v1);
		P(v2);
	},
	"rot": function(v1, v2, v3) {
		P(v2);
		P(v3);
		P(v1);
	},
	"drop": function(v1) {},
	"call": function(v1) {
		exec(v1);
	},
	"compose": function(v1, v2) {
		P(v1.concat(v2))
	},
	"exit": function() {
		process.exit();
	},
	"clear": function() {
		stack = [];
	},
	"eval": function(v1) {
		eval(v1);
	},
	"def": function(v1, v2) {
		eval('dict["' + v2 + '"] = ' + v1);
	},
	"Math.abs": function(v1) {
		P(Math.abs(v1));
	},
};

var kernel = [
	": when swap [ call ] [ drop ] if ;",
	": 2dip ( x y quot -- x y ) swap [ dip ] dip ;",
	": 3dip ( x y z quot -- x y z ) swap [ 2dip ] dip ;",
];

var exec = function(quote) {
	var error = execute(quote);
	if (error) {
		log(colors.red, error);
	}
};

var isNum = function(val) {
	return !isNaN(val);
};

var isString = function(val) {
	return val.slice(0, 1) == '"' && val.slice(-1) == '"';
};

var call = function(word) {
	var argc = word.length
	var argv = stack.splice(stack.length - argc, argc);
	if (argv.length == argc) {
		word.apply(null, argv);
	} else {
		stack.push.apply(stack, argv);
		return "stack underflow";
	}
};

var execute = function(tokens) {
	var tokens = tokens || [];

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];

		switch (state) {
			case INTERPRET:
				if (dict.hasOwnProperty(token)) {
					var word = dict[token];

					if (typeof(word) === 'function') {
						var error = call(word);
						if (error) {
							return error;
						}
					} else {
						var error = exec(word);
						if (error) {
							return error;
						}
					}
				} else if (token === 'null') {
					stack.push(null);
				} else if (token === 'undefined') {
					stack.push(undefined);
				} else if (token === 'true') {
					stack.push(true);
				} else if (token === 'false') {
					stack.push(false);
				} else if (isNum(token)) {
					stack.push(Number(token));
				} else if (token === '"') {
					state = STRING;
				} else if (token === ':') {
					state = DEFINITION;
				} else if (token === '(') {
					state = COMMENT;
				} else if (token === "[") {
					state = QUOTE;
				} else {
					return "UNKNOWN TOKEN: " + token;
				}
				break;
			case DEFINITION:
				name = token;
				state = COMPILE;
				break;
			case COMPILE:
				if (token === ":") {
					return "TOKEN : INSIDE DEFINITION";
				} else if (token === ";") {
					if (dict.hasOwnProperty(name)) {
						return "DUPLICATE WORD: " + name;
					}
					dict[name] = defstack;
					defstack = [];
					state = INTERPRET;
				} else {
					defstack.push(token);
				}
				break;
			case COMMENT:
				if (token === ")") {
					state = INTERPRET;
				}
				break;
			case STRING:
				if (token === '"') {
					stack.push(defstack.join(' '));
					defstack = [];
					state = INTERPRET;
				} else {
					defstack.push(token);
				}
				break;
			case QUOTE:
				if (token === "[") {
					return "TOKEN [ INSIDE QUOTATION";
				} else if (token === "]") {
					stack.push(defstack);
					defstack = [];
					state = INTERPRET;
				} else {
					defstack.push(token);
				}
				break;
			default:
				return "UNKNOWN STATE: " + state;
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

	exec(kernel.join("\n").match(/\S+/g));

	repl.on('close', function() {
		stdin.destroy();
	});

	repl.on('line', function(line) {
		exec(line.match(/\S+/g));

		if (state === INTERPRET) {
			repl.setPrompt('catcus> ');
			var pstack = [];
			for (var i = 0; i < stack.length; i++) {
				pstack.push(pp(stack[i]));
			}
			log(colors.white.bold, '=>', pstack.join(' '));
		} else {
			repl.setPrompt(colors.yellow('     .. '), 8);
		}

		repl.prompt();
	});

	repl.setPrompt('catcus> ');
	repl.prompt();
};
