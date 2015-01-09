var token = require('./token');

var operators = {
	'+': 'add',
	'-': 'sub',
	'*': 'mul',
	'/': 'div',
	'%': 'mod',
	'.': 'print',
	'&': 'AND',
	'~': 'NOT',
	'!': 'not',
	'^': 'XOR',
	'<': 'lt',
	'>': 'gt',
	'|': 'OR',
	'++': 'inc',
	'--': 'dec',
	'||': 'or',
	'&&': 'and',
	'<<': 'LSHIFT',
	'>>': 'RSHIFT',
	'<=': 'lte',
	'>=': 'gte',
	'==': 'eq',
	'!=': 'neq',
};

var Parser = function(tokens, context) {
	this.tokens = tokens;
	this.context = context || {};
	this.pos = 0;
	this.code = [];
};

Parser.prototype.run = function() {
	var state = parseRoot;
	while (state) {
		state = state(this);
	}
};

Parser.prototype.next = function() {
	return this.tokens[this.pos++];
};

Parser.prototype.expect = function(tokenType) {
	var t = this.next();
	if (t.type == tokenType) {
		return t.value;
	};
};

Parser.prototype.accept = function(tokenType) {
	var t = this.next();
	if (t.type == tokenType) {
		return t.value;
	}
	this.pos--;
};

Parser.prototype.emit = function(value) {
	this.code.push(value);
};

Parser.prototype.emitAll = function(value) {
	for (var i = 0; i < value.length; i++) {
		this.code.push(value[i]);
	}
};

Parser.prototype.lookup = function(value) {
	return this.context[value];
};

Parser.prototype.define = function(name, value) {
	var oldValue = this.context[name];
	if (oldValue) {
		console.error("Overwriting def: " + name);
	}
	this.context[name] = value;
};

exports.parse = function(tokens, context) {
	var parser = new Parser(tokens, context);
	parser.run();
	return parser.code.join("\n");
};

var parseRoot = function(parser) {
	while (true) {
		var t = parser.next();
		switch (t.type) {
			case token.EOF:
				return null;
			case token.Error:
				console.error(t.value);
				return null;
			case token.Comment:
				// parser.emit(t.value);
				break;
			case token.Number:
			case token.String:
			case token.Boolean:
			case token.Null:
			case token.Undefined:
			case token.NaN:
				parser.emit("catcus.push(" + t.value + ");");
				break;
			case token.Parser:
				var parserWord = parsers[t.value];
				if (parserWord) {
					return parserWord;
				}
				break;
			case token.Function:
				if (t.value == '{') {
					parser.emit("catcus.push(function() {");
				} else {
					parser.emit("});");
				}
				break;
			case token.Operator:
				t.type = token.Identifier;
				t.value = operators[t.value];
				// fallthrough
			case token.Identifier:
				var func = parser.lookup(t.value);
				if (func) {
					parser.emitAll(func);
				} else {
					console.error("Unknown identifier: " + t.value);
					return null;
				}
				break;
			default:
				console.error("Unknown token: " + t.type + " " + t.value);
				return null;
		}
	}
};

var parseJS = function(parser) {
	var name = parser.expect(token.Identifier);
	if (!name) {
		return console.error("Def name must be a valid identifier");
	}

	var lines = [];
	var line;
	while (line = parser.accept(token.String)) {
		lines.push(line.slice(1, line.length - 1));
	}

	var end = parser.expect(token.Operator);
	if (end != ';') {
		return console.error("JS: should be closed with ';'");
	}

	parser.define(name, lines);
	return parseRoot;
};

var parsers = {
	"JS:": parseJS,
};
