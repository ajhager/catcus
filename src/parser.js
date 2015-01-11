var token = require('./token');
var kernel = require('./kernel');

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
	return kernel[value] ? kernel[value] : this.context[value];
};

Parser.prototype.define = function(name, value) {
	var oldValue = this.context[name];
	if (oldValue) {
		console.error("overwriting def: " + name);
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
				parser.emit(t.value);
				break;
			case token.Number:
			case token.String:
			case token.Boolean:
			case token.Null:
			case token.Undefined:
			case token.NaN:
				parser.emit("catcus.push(" + t.value + ");");
				break;
			case token.Function:
				if (t.value == '{') {
					parser.emit("catcus.push(function() {");
				} else {
					parser.emit("});");
				}
				break;
			case token.Identifier:
				if (t.value == ':') {
					return parseFunc;
				}

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

var parseFunc = function(parser) {
	var name = parser.expect(token.Identifier);
	if (!name) {
		return console.error("function def name must be a valid identifier");
	}

	var lines = [];
	while (true) {
		var t = parser.next();

		switch (t.type) {
			case token.Number:
			case token.String:
			case token.Boolean:
			case token.Null:
			case token.Undefined:
			case token.NaN:
				lines.push("catcus.push(" + t.value + ");");
				break;
			case token.Function:
				if (t.value == '{') {
					lines.push("catcus.push(function() {");
				} else {
					lines.push("});");
				}
				break;
			case token.Identifier:
				if (t.value == ';') {
					parser.define(name, lines);
					return parseRoot;
				}

				var func = parser.lookup(t.value);
				if (func) {
					lines = lines.concat(func);
				} else {
					console.error("unknown identifier: " + t.value);
					return null;
				}
				break;
			default:
				console.error("unexpected token in func def " + t.type + " " + t.value);
				return null;
		}
	}
};
