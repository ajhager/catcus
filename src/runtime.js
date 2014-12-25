var colors = require('colors/safe');

var Quotation = function(tokens) {
	for (var i = 0; i < tokens.length; i++) {
		this.push(tokens[i]);
	}
};
Quotation.prototype = Array.prototype;
Quotation.prototype.constructor = Quotation;

Quotation.prototype.toString = function() {
	return "[" + this.join(' ') + "]";
};

var q = new Quotation([]);

var parser;
var parsers = {
	'(': function() {
		this.parse = function(token) {
			if (token === ")") {
				return true;
			}
		};
	},

	'"': function() {
		this.stack = [];

		this.parse = function(token) {
			if (token === '"') {
				runtime.push(this.stack.join(' '));
				return true;
			} else {
				this.stack.push(token);
			}
		};
	},

	'[': function() {
		this.stack = [];
		this.depth = 1;

		this.parse = function(token) {
			if (token === "[") {
				this.depth += 1;
				this.stack.push(token);
			} else if (token === "]") {
				this.depth -= 1;
				if (this.depth === 0) {
					runtime.push(new Quotation(this.stack));
					return true;
				} else {
					this.stack.push(token);
				}
			} else {
				this.stack.push(token);
			}
		};
	},

	':': function() {
		this.stack = [];

		this.parse = function(token) {
			if (token === ":") {
				throw "TOKEN : INSIDE DEFINITION";
			} else if (token === ";") {
				if (this.stack.length === 0) {
					return true;
				}

				var name = this.stack.shift();

				if (runtime.lookup(name)) {
					throw "DUPLICATE WORD: " + name;
				}

				runtime.define(name, this.stack);
				return true;
			} else {
				this.stack.push(token);
			}
		};
	},

	'JS:': function() {
		this.stack = [];

		this.parse = function(token) {
			if (token === ";") {
				if (this.stack.length === 0) {
					return true;
				}

				var name = this.stack.shift();

				if (runtime.lookup(name)) {
					throw "DUPLICATE WORD: " + name;
				}

				eval('runtime.define("' + name + '", ' + this.stack.join(' ') + ')');

				return true;
			} else {
				this.stack.push(token);
			}
		};
	},
};

var execute = function(tokens) {
	var tokens = tokens || [];

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];

		if (parser) {
			try {
				var result = parser.parse(token);
				if (result) {
					parser = null;
				}
			} catch (e) {
				return e;
			}
		} else {
			if (token.constructor === Quotation) {
				runtime.push(token)
				continue;
			}
			var word = runtime.lookup(token);
			if (word) {
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
			} else if (parsers[token]) {
				parser = new parsers[token];
			} else if (!isNaN(token)) {
				runtime.push(Number(token));
			} else {
				return "UNKNOWN TOKEN: " + token;
			}
		}
	}
};

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

	parsing: function() {
		return parser;
	},

	namespace: {},
	define: function(word, func) {
		this.namespace[word] = func;
	},
	lookup: function(word) {
		var obj = this.namespace[word];
		if (obj) return obj;

		var s = word.split('.')
		obj = global[s.shift()];
		while (obj && s.length) obj = obj[s.shift()];
		return obj;
	},
	call: function(word) {
		var argc = word.length
		var argv = this.pop(argc);
		if (argv.length == argc) {
			try {
				var ret = word.apply(word, argv);
				if (ret) {
					this.push(ret);
				}
			} catch (err) {
				return err;
			}
		} else {
			this.stack.push.apply(this.stack, argv);
			return "stack underflow";
		}
	},
	exec: function(quote) {
		var error = execute(quote);
		if (error) {
			console.log(colors.red(error));
		}
	},

	print: function(v) {
		if (typeof v === 'string') {
			return '"' + v + '"';
		}
		return String(v);
	},
};

module.exports = runtime;
