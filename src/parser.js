var token = require('./token');

var Parser = function(tokens) {
	this.tokens = tokens;
	this.context = {};
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

exports.parse = function(tokens) {
	var parser = new Parser(tokens);
	parser.run();
	return parser.code;
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
			case token.Identifier:
				if (t.value == "function") {
					return parseDef;
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

var parseDef = function(parser) {
	var name = parser.expect(token.Identifier);
	if (!name) {
		return console.error("Def name must be a valid identifier");
	}

	var lines = [];
	var line;
	while (line = parser.accept(token.String)) {
		lines.push(line.slice(1, line.length-1));
	}

	var end = parser.expect(token.Identifier);
	if (end != 'end') {
		return console.error("Def should be closed with 'end'");
	}

	parser.define(name, lines);
	return parseRoot;
};
