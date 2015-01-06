var token = require('./token');

exports.parse = function(tokens) {
	for (var i = 0; i < tokens.length; i++) {
		if (tokens[i].type === token.Error) {
			console.error(tokens[i].value);
		} else {
			console.log(tokens[i].type, tokens[i].value);
		}
	}
};
