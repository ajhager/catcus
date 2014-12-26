var colors = require('colors/safe');
var fs = require('fs');
var path = require('path');
var readline = require('readline');

var runtime = require('./runtime');

module.exports = function() {
	var banner = colors.grey("  /\\___/\\\n  ) -.- (  " + colors.white.bold("$%#@&!\n") + " =\\  o  /=   " + colors.yellow("v0.0.1\n") + "   )   (\n");

	console.log(banner);

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

	args = process.argv.slice(2);
	args.unshift(path.dirname(__dirname) + '/lib/kernel.cus');

	for (var i = 0; i < args.length; i++) {
		try {
			var file = fs.readFileSync(args[i], 'utf8');
			runtime.exec(file.match(/\S+/g));
			console.log("Loaded file: " + args[i]);
		} catch (e) {
			console.error(e);
		}
	}

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
			var output = [];
			for (var i = 0; i < runtime.stack.length; i++) {
				output.push(runtime.print(runtime.stack[i]));
			}
			console.log(colors.white.bold('=>'), colors.white.bold(output.join(' ')));
		}

		repl.prompt();
	});

	repl.setPrompt(normalPrompt, 8);
	repl.prompt();
};
