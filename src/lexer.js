var unicode = require('unicode-categories');
var token = require('./token');

var EOF = -1;
var isWhitespace = function(c) {
	return '\t\n\v\f\r \u0085\u00A0'.indexOf(c) >= 0;
}

var Lexer = function(input) {
	this.input = input;
	this.start = 0;
	this.pos = 0;
	this.done = false;
	this.tokens = [];
};

Lexer.prototype.run = function() {
	var state = lexRoot;
	while (state) {
		state = state(this);
	};
};

Lexer.prototype.emit = function(tokenType) {
	this.tokens.push({
		type: tokenType,
		value: this.span(),
		position: this.start,
	});
	this.start = this.pos;
};

Lexer.prototype.next = function() {
	if (this.pos >= this.input.length) {
		this.done = true;
		return EOF;
	}
	return this.input[this.pos++];
};

Lexer.prototype.ignore = function() {
	this.start = this.pos;
};

Lexer.prototype.backup = function() {
	if (!this.done) {
		this.pos--;
	}
};

Lexer.prototype.peek = function() {
	var next = this.next();
	this.backup();
	return next;
};

Lexer.prototype.error = function(error) {
	this.tokens.push({
		type: token.Error,
		value: error,
		position: this.pos,
	});
};

Lexer.prototype.accept = function(valid) {
	if (valid.indexOf(this.next()) >= 0) {
		return true;
	}
	this.backup();
	return false;
};

Lexer.prototype.acceptRun = function(valid) {
	while (valid.indexOf(this.next()) >= 0) {}
	this.backup();
};

Lexer.prototype.span = function() {
	return this.input.slice(this.start, this.pos);
};

exports.lex = function(input) {
	lexer = new Lexer(input);
	lexer.run();
	return lexer.tokens;
};

var lexRoot = function(lexer) {
	while (true) {
		var c = lexer.next();
		switch (true) {
			case c == EOF:
				lexer.emit(token.EOF);
				return null;
			case isWhitespace(c):
				lexer.ignore();
				break;
			case c == '/':
				var nc = lexer.next();
				if (nc == '/') {
					return lexComment;
				} else if (nc == '*') {
					return lexMultiComment;
				}
				return lexer.error('bad comment syntax: ' + lexer.span());
			case c == '+' || c == '-' || '0' <= c && c <= '9':
				lexer.backup();
				return lexNumber;
			case c == '\"':
				return lexString;
			case unicode.ECMA.start.test(c):
				lexer.backup();
				return lexIdentifier;
			default:
				return lexer.error("bad character: '" + c + "'");
		}
	}
};

var lexComment = function(lexer) {
	while (true) {
		var c = lexer.next();
		if (c == '\n' || c == EOF) {
			lexer.backup();
			lexer.emit(token.Comment);
			return lexRoot;
		}
	}
};

var lexMultiComment = function(lexer) {
	while (true) {
		switch (lexer.next()) {
			case EOF:
				return lexer.error('unterminated multiline comment: ' + lexer.span());
			case '*':
				if (lexer.next() == '/') {
					lexer.emit(token.Comment);
					return lexRoot;
				}
				l.backup();
		}
	}
	return null;
};

var lexNumber = function(lexer) {
	lexer.accept("+-");

	var digits = "0123456789";
	if (lexer.accept("0") && lexer.accept("xX")) {
		digits = "0123456789abcdefABCDEF";
	}
	lexer.acceptRun(digits);

	if (lexer.accept(".")) {
		lexer.acceptRun(digits);
	}

	if (lexer.accept("eE")) {
		lexer.accept("+-");
		lexer.acceptRun("0123456789");
	}

	var c = lexer.peek();
	if ('\t\n\v\f\r \u0085\u00A0'.indexOf(c) >= 0 || c == EOF) {
		lexer.emit(token.Number);
		return lexRoot;
	}

	lexer.next();
	return lexer.error("bad number syntax: " + lexer.span());
};

var lexString = function(lexer) {
	while (true) {
		switch (lexer.next()) {
			case '\\':
				var c = lexer.next();
				if (c != EOF && c != '\n') {
					break;
				}
			case EOF:
			case '\n':
				return lexer.error("unterminated quoted string");
			case '\"':
				lexer.emit(token.String);
				return lexRoot;
		}
	}
};

var lexIdentifier = function(lexer) {
	while (true) {
		var c = lexer.next();
		if (!unicode.ECMA.part.test(c) || c == EOF) {
			if ('\t\n\v\f\r \u0085\u00A0'.indexOf(c) >= 0 || c == EOF) {
				lexer.backup();

				var value = lexer.span();
				if (value == 'true' || value == 'false' || value == 'null' || value == 'undefined') {
					lexer.emit(token.Builtin);
				} else {
					lexer.emit(token.Identifier);
				}

				return lexRoot;
			} else {
				return lexer.error("unexpected char in identifier: '" + c + "'");
			}
		}
	}
};
