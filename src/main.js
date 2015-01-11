var fs = require('fs');
var path = require('path');
var vm = require('vm');
var util = require('util');

var colors = require('colors/safe');
var readline = require('readline');

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

var banner = colors.grey("  /\\___/\\\n  ) -.- (  " + colors.white.bold("$%#@&!\n") + " =\\  o  /=   " + colors.yellow("v0.0.5\n") + "   )   (\n");

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
	var context = {};

	var kernel = path.dirname(__dirname) + '/lib/kernel.cus';
	var file = fs.readFileSync(kernel, 'utf8');
	var tokens = lex(file);
	var code = parse(tokens, context);

	var env = {
		catcus: [],
		require: require,
		exports: exports,
	};

	var name;
	for (name in global) {
		env[name] = global[name];
	}

	repl.on('line', function(line) {
		tokens = lex(line);
		code = parse(tokens, context);
		vm.runInNewContext(code, env, 'eval');
		console.log(colors.white.bold(formatStack(env.catcus)));
		repl.prompt();
	});

	repl.prompt();
};
