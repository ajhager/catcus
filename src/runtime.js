Array.prototype.toString = function() {
	return "[ " + this.join(' ') + " ]";
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
		return this.parser;
	},

	namespace: {},
	define: function(word, func) {
		this.namespace[word] = func;
	},
	lookup: function(word) {
		return this.namespace[word];
	},
	call: function(word, con) {
		var argc = word.length
		var argv = this.pop(argc);
		if (argv.length == argc) {
			try {
				if (con) {
					function F() {
						return word.apply(this, argv);
					}
					F.prototype = word.prototype;
					this.push(new F());
				} else {
					var ret = word.apply(word, argv);
					if (ret) {
						this.push(ret);
					}
				}
			} catch (err) {
				return err;
			}
		} else {
			this.stack.push.apply(this.stack, argv);
			return "stack underflow";
		}
	},

	parser: null,
	parsers: {
		'\\': function() {
			this.parse = function(token) {
				var f = runtime.lookup(token);
				if (f) {
					runtime.push(f);
				} else {
					throw "Quoted word does not exist";
				}
				return true;
			};
		},

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
						runtime.push(this.stack);
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

		'::': function() {
			this.stack = [];

			this.parse = function(token) {
				if (token === '::') {
					throw "TOKEN :: INSIDE Object DEFINITION";
				}

				if (token === ';') {
					if (this.stack.length === 0) {
						return true;
					}

					var name = this.stack.shift();

					if (runtime.lookup(name)) {
						throw "DUPLICATE WORD: " + name;
					}

					var args = "";
					var body = "";
					for (var i = 0; i < this.stack.length; i++) {
						var v = this.stack[i];

						args = args + v;
						if (i < this.stack.length-1) {
							args = args + ',';
						}
						body = body + "this[\"" + v + "\"] = " + v + ";\n";
					}

					var def = "function " + name + " (" + args + ") {\n" + body + "}";
					eval('runtime.define("' + name + '", ' + def + ')');

					return true;
				}

				this.stack.push(token);
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
	},

	exec: function(tokens) {
		var tokens = tokens || [];

		if (typeof tokens === 'function') {
			var error = runtime.call(tokens);
			if (error) {
				console.error(error);
				return;
			}
			return;
		}

		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];

			if (this.parser) {
				try {
					var result = this.parser.parse(token);
					if (result) {
						this.parser = null;
					}
				} catch (e) {
					console.error(e);
					return;
				}
			} else {
				if (Array.isArray(token)) {
					runtime.push(token)
					continue;
				}

				var word = runtime.lookup(token);

				if (word) {
					if (typeof(word) === 'function') {
						var error = runtime.call(word);
						if (error) {
							console.error(error);
							return;
						}
					} else {
						var error = runtime.exec(word);
						if (error) {
							console.error(error);
							return;
						}
					}
				} else if (this.parsers[token]) {
					this.parser = new this.parsers[token];
				} else if (!isNaN(token)) {
					runtime.push(Number(token));
				} else {
					console.error("UNKNOWN TOKEN: " + token);
					return;
				}
			}
		}
	},

	print: function(v) {
		if (typeof v === 'string') {
				return '"' + v + '"';
		}
		if (typeof v === 'function') {
			return v.name;
		}
		if (typeof v === 'object') {
			return v.constructor.name + '{' + '}';
		}
		return String(v);
	}
};

module.exports = runtime;
