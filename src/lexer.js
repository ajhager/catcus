// Copyright 2015 Joseph Hager. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import * as unicode from 'unicode-categories';

export var token = {
	EOF: "TokenEOF",
	Error: "TokenError",
	Comment: "TokenComment",
	Literal: "TokenLiteral",
	Identifier: "TokenIdentifier",
};

var EOF = -1;

function isWhitespace(c) {
	return '\t\n\v\f\r \u0085\u00A0'.indexOf(c) >= 0 || c == EOF;
}
var operators = ['{', '}', '\\', ':', ';', '+', '-', '*', '/', '%', '.', '<', '>', '!', '&', '|', '~', '^', '='];

class Lexer {
	constructor(input) {
		this.input = input;
		this.start = 0;
		this.pos = 0;
		this.done = false;
		this.tokens = [];
	}

	run() {
		var state = lexRoot;
		while (state) {
			state = state(this);
		}
	}

	emit(tokenType) {
		this.tokens.push({
			type: tokenType,
			value: this.span(),
			position: this.start,
		});
		this.start = this.pos;
	}

	next() {
		if (this.pos >= this.input.length) {
			this.done = true;
			return EOF;
		}
		return this.input[this.pos++];
	}

	ignore() {
		this.start = this.pos;
	}

	backup() {
		if (!this.done) {
			this.pos--;
		}
	}

	peek() {
		var next = this.next();
		this.backup();
		return next;
	}

	error(error) {
		this.tokens.push({
			type: token.Error,
			value: error,
			position: this.pos,
		});
	}

	accept(valid) {
		if (valid.indexOf(this.next()) >= 0) {
			return true;
		}
		this.backup();
		return false;
	}

	acceptRun(valid) {
		while (valid.indexOf(this.next()) >= 0) {}
		this.backup();
	}

	span() {
		return this.input.slice(this.start, this.pos);
	}
}

export default function lex(input) {
	var lexer = new Lexer(input);
	lexer.run();
	return lexer.tokens;
};

function lexRoot(lexer) {
	while (true) {
		var c = lexer.next();
		switch (true) {
			case c == EOF:
				lexer.emit(token.EOF);
				return null;
			case isWhitespace(c):
				lexer.ignore();
				break;
			case operators.indexOf(c) > -1:
				lexer.backup();
				return lexOperator;
			case '0' <= c && c <= '9':
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
}

function lexOperator(lexer) {
	var op1 = lexer.next();
	var op2 = lexer.next();

	// Single operator
	if (isWhitespace(op2)) {
		lexer.backup();
		if (op1 == '=') {
			return lexer.error('no operator named: ' + lexer.span());
		}
		lexer.emit(token.Identifier);
		return lexRoot;
	}

	// Comment
	if (op1 == '/' && op2 == '/') {
		return lexComment;
	}

	// Multiline comment
	if (op1 == '/' && op2 == '*') {
		return lexMultiComment;
	}

	// Plus or minus number
	if ((op1 == '+' || op1 == '-') && ('0' <= op2 && op2 <= '9')) {
		lexer.backup();
		return lexNumber;
	}

	// There are no operators of length 3.
	if (!isWhitespace(lexer.next())) {
		return lexer.error('no operator named: ' + lexer.span());
	}
	lexer.backup();

	// Length two operators.
	switch (true) {
		case op1 == '+' && op2 == '+':
		case op1 == '-' && op2 == '-':
		case op1 == '|' && op2 == '|':
		case op1 == '&' && op2 == '&':
		case op1 == '<' && op2 == '<':
		case op1 == '<' && op2 == '=':
		case op1 == '>' && op2 == '>':
		case op1 == '>' && op2 == '=':
		case op1 == '=' && op2 == '=':
		case op1 == '!' && op2 == '=':
		case op1 == ':' && op2 == ':':
			lexer.emit(token.Identifier);
			return lexRoot;
		default:
			return lexer.error('no operator named: ' + lexer.span());
	}
}

function lexComment(lexer) {
	while (true) {
		var c = lexer.next();
		if (c == '\n' || c == EOF) {
			lexer.backup();
			lexer.emit(token.Comment);
			return lexRoot;
		}
	}
}

function lexMultiComment(lexer) {
	while (true) {
		switch (lexer.next()) {
			case EOF:
				return lexer.error('unterminated multiline comment: ' + lexer.span());
			case '*':
				if (lexer.next() == '/') {
					lexer.emit(token.Comment);
					return lexRoot;
				}
				lexer.backup();
		}
	}
	return null;
}

function lexNumber(lexer) {
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
	if (isWhitespace(c)) {
		lexer.emit(token.Literal);
		return lexRoot;
	}

	lexer.next();
	return lexer.error("bad number syntax: " + lexer.span());
}

function lexString(lexer) {
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
				lexer.emit(token.Literal);
				return lexRoot;
		}
	}
}

function lexIdentifier(lexer) {
	while (true) {
		var c = lexer.next();

		if (!unicode.ECMA.part.test(c) || c == EOF) {
			if (isWhitespace(c)) {
				lexer.backup();

				switch (lexer.span()) {
					case 'true':
					case 'false':
					case 'null':
					case 'undefined':
					case 'NaN':
						lexer.emit(token.Literal);
						break;
					default:
						lexer.emit(token.Identifier);
				}

				return lexRoot;
			} else {
				return lexer.error("unexpected char in identifier: '" + c + "'");
			}
		}
	}
}
