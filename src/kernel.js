module.exports = {
	'.': [
		"var catcus1 = catcus.pop();",
		"console.log(catcus1);",
	],

	'+': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 + catcus1);"
	],

	'++': [
		"var catcus1 = catcus.pop();",
		"catcus.push(catcus1 + 1);",
	],

	'-': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 - catcus1);",
	],

	'--': [
		"var catcus1 = catcus.pop();",
		"catcus.push(catcus1 - 1);",
	],

	'*': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 * catcus1);",
	],

	'/': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 / catcus1);",
	],

	'%': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 % catcus1);",
	],

	'==': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 == catcus1);",
	],

	'!=': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 != catcus1);",
	],

	'<': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 < catcus1);",
	],

	'<=': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 <= catcus1);",
	],

	'>': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 > catcus1);",
	],

	'>=': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 >= catcus1);",
	],

	'&&': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 && catcus1);",
	],

	'||': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 || catcus1);",
	],

	'!': [
		"var catcus1 = catcus.pop();",
		"catcus.push(!catcus1);",
	],

	'&': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 & catcus1);",
	],

	'|': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 | catcus1);",
	],

	'~': [
		"var catcus1 = catcus.pop();",
		"catcus.push(~catcus1);",
	],

	'^': [
		"var catcus1 = catcus.pop();",
		"catcus.push(^catcus1);",
	],

	'<<': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 << catcus1);",
	],

	'>>': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 >> catcus1);",
	],

	'dup': [
		"var catcus1 = catcus.pop();",
		"catcus.push(catcus1);",
		"catcus.push(catcus1);",
	],

	'dup2': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2);",
		"catcus.push(catcus1);",
		"catcus.push(catcus2);",
		"catcus.push(catcus1);",
	],

	'dup3': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"catcus.push(catcus3);",
		"catcus.push(catcus2);",
		"catcus.push(catcus1);",
		"catcus.push(catcus3);",
		"catcus.push(catcus2);",
		"catcus.push(catcus1);",
	],

	'dup4': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"var catcus4 = catcus.pop();",
		"catcus.push(catcus4);",
		"catcus.push(catcus3);",
		"catcus.push(catcus2);",
		"catcus.push(catcus1);",
		"catcus.push(catcus4);",
		"catcus.push(catcus3);",
		"catcus.push(catcus2);",
		"catcus.push(catcus1);",
	],

	'drop': [
		"catcus.pop();",
	],

	'drop2': [
		"catcus.pop();",
		"catcus.pop();",
	],

	'drop3': [
		"catcus.pop();",
		"catcus.pop();",
		"catcus.pop();",
	],

	'drop4': [
		"catcus.pop();",
		"catcus.pop();",
		"catcus.pop();",
		"catcus.pop();",
	],

	'swap': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus1);",
		"catcus.push(catcus2);",
	],

	'nip': [
		"var catcus1 = catcus.pop();",
		"catcus.pop();",
		"catcus.push(catcus1);",
	],

	'nip2': [
		"var catcus1 = catcus.pop();",
		"catcus.pop();",
		"catcus.pop();",
		"catcus.push(catcus1);",
	],

	'over': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2);",
		"catcus.push(catcus1);",
		"catcus.push(catcus2);",
	],

	'over2': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"catcus.push(catcus3);",
		"catcus.push(catcus2);",
		"catcus.push(catcus1);",
		"catcus.push(catcus3);",
		"catcus.push(catcus2);",
	],

	'pick': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"catcus.push(catcus3);",
		"catcus.push(catcus2);",
		"catcus.push(catcus1);",
		"catcus.push(catcus3);",
	],

	'rot': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"catcus.push(catcus2);",
		"catcus.push(catcus1);",
		"catcus.push(catcus3);",
	],

	'call': [
		"var catcus1 = catcus.pop();",
		"catcus1();",
	],

	'dip': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus1();",
		"catcus.push(catcus2);",
	],

	'dip2': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"catcus1();",
		"catcus.push(catcus3);",
		"catcus.push(catcus2);",
	],

	'curry': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(function() {",
		"catcus.push(catcus2);",
		"catcus1();",
		"});",
	],

	'compose': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(function() {",
		"catcus2();",
		"catcus1();",
		"});",
	],

	'prepose': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(function() {",
		"catcus1();",
		"catcus2();",
		"});",
	],

	'if': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.pop() ? catcus2() : catcus1();",
	],

	'loop': [
		"var catcus1 = catcus.pop();",
		"while (true) {",
		"catcus1();",
		"var catcus2 = catcus.pop();",
		"if (!catcus2) break;",
		"}",
	],

	'times': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"for (var i = 0; i < catcus2; i++) { catcus1(); }",
	],

	'array': [
		"catcus.push([]);",
	],

	'array1': [
		"catcus1 = catcus.pop();",
		"catcus.push([catcus1]);",
	],

	'array2': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push([catcus2, catcus1]);",
	],

	'array3': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"catcus.push([catcus3, catcus2, catcus1]);",
	],

	'array4': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"var catcus4 = catcus.pop();",
		"catcus.push([catcus4, catcus3, catcus2, catcus1]);",
	],

	'arrayn': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = [];",
		"for (var i = 0; i < catcus1; i++) {",
		"var catcus3 = catcus.pop();",
		"catcus2.unshift(catcus3);",
		"}",
		"catcus.push(catcus2);",
	],

	'push': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus2.push(catcus1);",
		"catcus.push(catcus2);",
	],

	'map': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2.map(function(v) {",
		"catcus.push(v);",
		"catcus1();",
		"return catcus.pop();",
		"}));",
	],

	'concat': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2.concat(catcus1));",
	],

	'length': [
		"var catcus1 = catcus.pop();",
		"catcus.push(catcus1.length);",
	],

	'get': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus1[catcus2]);",
	],

	'set': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"catcus1[catcus2] = catcus3;",
	],

	'keep': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2);",
		"catcus1();",
		"catcus.push(catcus2);",
	],

	'when': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"if (catcus2) { catcus1(); }",
	],

	'_bi': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"catcus.push(catcus3);",
		"catcus2();",
		"catcus.push(catcus3);",
		"catcus1();",
	],

	'bi': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"var catcus4 = catcus.pop();",
		"catcus.push(catcus4);",
		"catcus2();",
		"catcus.push(catcus3);",
		"catcus1();",
	],

	'bi_': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"catcus.push(catcus3);",
		"catcus1();",
		"catcus.push(catcus2);",
		"catcus1();",
	],

	'_tri': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"var catcus4 = catcus.pop();",
		"catcus.push(catcus4);",
		"catcus3();",
		"catcus.push(catcus4);",
		"catcus2();",
		"catcus.push(catcus4);",
		"catcus1();",
	],

	'tri': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"var catcus4 = catcus.pop();",
		"var catcus5 = catcus.pop();",
		"var catcus6 = catcus.pop();",
		"catcus.push(catcus6);",
		"catcus3();",
		"catcus.push(catcus5);",
		"catcus2();",
		"catcus.push(catcus4);",
		"catcus1();",
	],

	'tri_': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"var catcus4 = catcus.pop();",
		"catcus.push(catcus4);",
		"catcus1();",
		"catcus.push(catcus3);",
		"catcus1();",
		"catcus.push(catcus2);",
		"catcus1();",
	],
};