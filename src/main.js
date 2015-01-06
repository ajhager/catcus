var fs = require('fs');
var path = require('path');
var vm = require('vm');
var util = require('util');

var colors = require('colors/safe');
var readline = require('readline');

//var compile = require('./compiler').compile;
var lex = require('./lexer').lex;
var parse = require('./parser').parse;

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

var banner = colors.grey("  /\\___/\\\n  ) -.- (  " + colors.white.bold("$%#@&!\n") + " =\\  o  /=   " + colors.yellow("v0.0.3\n") + "   )   (\n");

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

module.exports = function() {
	console.log(banner);

	var repl = readline.createInterface(process.openStdin(), process.stdout);
	repl.setPrompt(colors.magenta('catcus> '), 8)

	repl.on('line', function(line) {
		var tokens = lex(line);
		var code = parse(tokens);
		console.dir(code);
		// var code = compile(ast);
		// vm.runInNewContext(code, context, 'eval');
		// console.log(colors.white.bold(formatStack(context.stack)));
		repl.prompt();
	});

	repl.prompt();
};