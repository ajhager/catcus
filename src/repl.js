var colors = require('colors/safe');
var path = require('path');
var readline = require('readline');

var runtime = {
	stack: [],
	push: function(v1) {
		this.stack.push(v1);
	},
	pop: function(n) {
		return this.stack.splice(this.stack.length - n, n);
	},
	clear: function() {
		this.stack = [];
	},

	namespace: {},
	exists: function(word) {
		return this.namespace.hasOwnProperty(word)
	},
	define: function(word, func) {
		this.namespace[word] = func;
	},
	lookup: function(word) {
		return this.namespace[word];
	},

	exec: function(quote) {
		var error = execute(quote);
		if (error) {
			console.log(colors.red(error));
		}
	},
	call: function(word) {
		var argc = word.length
		var argv = this.pop(argc);
		if (argv.length == argc) {
			word.apply(null, argv);
		} else {
			this.stack.push.apply(this.stack, argv);
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

var states = {
	INTERPRET: 0,
	DEFINITION: 1,
	COMPILE: 2,
	COMMENT: 3,
	QUOTE: 4,
	STRING: 5,
	JSCOMPILE: 6,
	JSDEF: 7,
};
var state = states.INTERPRET;
var defname = "";
var defstack = [];

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

		switch (state) {
			case states.INTERPRET:
				if (runtime.exists(token)) {
					var word = runtime.lookup(token);

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
					state = states.STRING;
				} else if (token === ':') {
					state = states.DEFINITION;
				} else if (token === 'JS:') {
					state = states.JSDEF;
				} else if (token === '(') {
					state = states.COMMENT;
				} else if (token === "[") {
					state = states.QUOTE;
				} else {
					return "UNKNOWN TOKEN: " + token;
				}
				break;
			case states.DEFINITION:
				defname = token;
				state = states.COMPILE;
				break;
			case states.JSDEF:
				defname = token;
				state = states.JSCOMPILE;
				break;
			case states.COMPILE:
				if (token === ":") {
					return "TOKEN : INSIDE DEFINITION";
				} else if (token === ";") {
					if (runtime.exists(defname)) {
						return "DUPLICATE WORD: " + defname;
					}
					runtime.define(defname, defstack);
					defstack = [];
					state = states.INTERPRET;
				} else {
					defstack.push(token);
				}
				break;
			case states.JSCOMPILE:
				if (token === ";") {
					if (runtime.exists(defname)) {
						return "DUPLICATE WORD: " + defname;
					}
					eval('runtime.define("' + defname + '", ' + defstack.join(' ') + ')');
					defstack = [];
					state = states.INTERPRET;
				} else {
					defstack.push(token);
				}
				break;
			case states.COMMENT:
				if (token === ")") {
					state = states.INTERPRET;
				}
				break;
			case states.STRING:
				if (token === '"') {
					runtime.push(defstack.join(' '));
					defstack = [];
					state = states.INTERPRET;
				} else {
					defstack.push(token);
				}
				break;
			case states.QUOTE:
				if (token === "[") {
					return "TOKEN [ INSIDE QUOTATION";
				} else if (token === "]") {
					runtime.push(defstack);
					defstack = [];
					state = states.INTERPRET;
				} else {
					defstack.push(token);
				}
				break;
			default:
				return "UNKNOWN STATE: " + state;
		}
	}
};

var banner = colors.grey("  /\\___/\\\n  ) -.- (  " + colors.white.bold("$%#@&!\n") + " =\\  o  /=   " + colors.red("v0.0.1\n") + "   )   (\n");

module.exports = function() {
	console.log(banner);

	var fs = require('fs');
	var kernel = fs.readFileSync(path.dirname(__dirname) + '/lib/kernel.cus', 'utf8');
	runtime.exec(kernel.match(/\S+/g));

	var stdout = process.stdout;
	var stdin = process.openStdin();
	var repl = readline.createInterface(stdin, stdout);

	var normalPrompt = colors.magenta('catcus> ')
	var blockPrompt = colors.yellow('     .. ');

	repl.on('close', function() {
		stdin.destroy();
	});

	repl.on('line', function(line) {
		runtime.exec(line.match(/\S+/g));

		if (state === states.INTERPRET) {
			repl.setPrompt(normalPrompt, 8);
			console.log(colors.white.bold('=>'), colors.white.bold(stackToString()));
		} else {
			repl.setPrompt(blockPrompt, 8);
		}

		repl.prompt();
	});

	repl.setPrompt(normalPrompt, 8);
	repl.prompt();
};
