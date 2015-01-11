// Copyright 2015 Joseph Hager. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var vm = require('vm');
var util = require('util');

var colors = require('colors/safe');
var readline = require('readline');

var lex = require('./lexer').lex;
var parse = require('./parser').parse;

module.exports = function() {
	console.log(banner);

	var repl = readline.createInterface(process.openStdin(), process.stdout);
	repl.setPrompt(colors.magenta('catcus> '), 8)

	var context = {};
	var env = sandbox();
	repl.on('line', function(line) {
		tokens = lex(line);
		code = parse(tokens, context);
		vm.runInNewContext(code, env, 'eval');
		console.log(colors.white.bold(formatStack(env.catcus)));
		repl.prompt();
	});

	repl.prompt();
};

var oldLog = console['log'].bind(console);
console['log'] = function() {
	var args = [].slice.call(arguments, 0);
	oldError(colors.green(args.join(' ')));
};

var oldError = console['error'].bind(console);
console['error'] = function() {
	var args = [].slice.call(arguments, 0);
	oldError(colors.red(args.join(' ')));
};

var banner = colors.grey("  /\\___/\\\n  ) -.- (  " + colors.white.bold("$%#@&!\n") + " =\\  o  /=   " + colors.yellow("v0.0.6\n") + "   )   (\n");

var formatStack = function(stack) {
	var output = ['=>'];
	var input = stack;
	if (input.length > 10) {
		output.push('...');
		input = input.slice(input.length - 10, input.length);
	}
	for (var i = 0; i < input.length; i++) {
		output.push(util.inspect(input[i]));
	}
	return output.join(' ');
};

var sandbox = function() {
	var sandbox = {
		catcus: [],
	};
	var name;
	for (name in global) {
		sandbox[name] = global[name];
	}

	return sandbox;
};
