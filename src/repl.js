var colors = require('colors/safe');
var path = require('path');
var readline = require('readline');

var runtime = require('./runtime');

var stackToString = function() {
	var output = [];
	for (var i = 0; i < runtime.stack.length; i++) {
		output.push(runtime.print(runtime.stack[i]));
	}
	return output.join(' ');
};

var banner = colors.grey("  /\\___/\\\n  ) -.- (  " + colors.white.bold("$%#@&!\n") + " =\\  o  /=   " + colors.yellow("v0.0.1\n") + "   )   (\n");

module.exports = function() {
	console.log(banner);

	var fs = require('fs');
	var kernel = fs.readFileSync(path.dirname(__dirname) + '/lib/kernel.cus', 'utf8');
	runtime.exec(kernel.match(/\S+/g));

	var stdout = process.stdout;
	var stdin = process.openStdin();
	var repl = readline.createInterface(stdin, stdout);

	var normalPrompt = colors.magenta('catcus> ')
	var blockPrompt = colors.yellow('     .. ');

	repl.on('close', function() {
		stdin.destroy();
	});

	repl.on('line', function(line) {
		runtime.exec(line.match(/\S+/g));

		if (runtime.parsing()) {
			repl.setPrompt(blockPrompt, 8);
		} else {
			repl.setPrompt(normalPrompt, 8);
			console.log(colors.white.bold('=>'), colors.white.bold(stackToString()));
		}

		repl.prompt();
	});

	repl.setPrompt(normalPrompt, 8);
	repl.prompt();
};
