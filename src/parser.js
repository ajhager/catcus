// Copyright 2015 Joseph Hager. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var token = require('./token');
var kernel = require('./kernel');

var Parser = function(tokens, context) {
	this.tokens = tokens;
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
	for (var i = 0; i < value.length; i++) {
		this.code.push(value[i]);
	}
};

Parser.prototype.lookup = function(value) {
	return kernel[value];
};

exports.parse = function(tokens) {
	var parser = new Parser(tokens);
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
				parser.emit([t.value]);
				break;
			case token.Number:
			case token.String:
			case token.Boolean:
			case token.Null:
			case token.Undefined:
			case token.NaN:
				parser.emit(["catcus.push(" + t.value + ");"]);
				break;
			case token.Function:
				if (t.value == '{') {
					parser.emit(["catcus.push(function() {"]);
				} else {
					parser.emit(["});"]);
				}
				break;
			case token.Identifier:
				if (t.value == ':') {
					return parseFunc;
				}

				if (t.value == '::') {
					return parseObj;
				}

				if (t.value == '\\') {
					return parseQuote;
				}

				var func = parser.lookup(t.value);
				if (func) {
					parser.emit(func);
				} else {
					parser.emit([
						"var catcus1 = " + t.value + "();",
						"if (typeof catcus1 !== 'undefined') { catcus.push(catcus1); }",
					]);
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
					lines.unshift("function " + name + "() {");
					lines.push("}");
					parser.emit(lines);
					return parseRoot;
				}

				var func = parser.lookup(t.value);
				if (func) {
					lines = lines.concat(func);
				} else {
					lines = lines.concat([
						"var catcus1 = " + t.value + "();",
						"if (typeof catcus1 !== 'undefined') { catcus.push(catcus1); }",
					]);
				}
				break;
			default:
				console.error("unexpected token in func def " + t.type + " " + t.value);
				return null;
		}
	}
};

var parseObj = function(parser) {
	var name = parser.expect(token.Identifier);
	if (!name) {
		return console.error("obj def name must be a valid identifier");
	}

	var fields = [];
	while (true) {
		var field = parser.expect(token.Identifier);
		if (!field) {
			return console.error("obj field must be a valid identifier");
		}

		if (field == ';') {
			var args = "function " + name + "(";
			var lines = [];
			for (var i = 0; i < fields.length; i++) {
				var field = fields[i];

				args = args + field;
				if (i < fields.length - 1) {
					args = args + ', ';
				}
				lines.push("this." + field + " = " + field + ";");
			}
			lines.unshift(args + ") {");
			lines.push("}");

			parser.emit(lines);

			return parseRoot;
		}

		fields.push(field);
	}
};

var parseQuote = function(parser) {
	var name = parser.expect(token.Identifier);
	if (!name) {
		return console.error("quoted name must be a valid identifier");
	}

	var func = parser.lookup(name);
	if (func) {
		var lines = ["catcus.push(function "+name+"() {"];
		lines = lines.concat(func);
		lines.push("});");
		parser.emit(lines);
	} else {
		parser.emit(["catcus.push("+name+");"]);
	}

	return parseRoot;
};
