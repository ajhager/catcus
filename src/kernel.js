// Copyright 2015 Joseph Hager. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var genCall = function(n, constructor) {
	var lines = ["var catcus1 = catcus.pop();"];

	var args = "";
	for (var i = 0; i < n; i++) {
		var arg = "catcus" + (i+2);
		args = args + arg;
		if (i < n - 1) {
			args = args + ', ';
		}

		lines.push("var " + arg + " = catcus.pop();");
	}

	var def = "catcus1(" + args + ")";
	if (constructor) {
		def = "catcus.push(new " + def + ");";
	} else {
		def = def + ";";
	}
	lines.push(def);

	return lines;
};

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

	'call': genCall(0),
	'call1': genCall(1),
	'call2': genCall(2),
	'call3': genCall(3),
	'call4': genCall(4),
	'call5': genCall(5),
	'call6': genCall(6),
	'call7': genCall(7),
	'call8': genCall(8),
	'call9': genCall(9),
	'calln': [
		"var catcus1 = catcus.pop();",	
		"var catcus2 = catcus1.length;",	
		"var catcus3 = [];",
		"for (var i = 0; i < catcus2; i++) {",
		"var catcus4 = catcus.pop();",
		"catcus3.push(catcus4);",
		"}",
		"catcus1.apply(null, catcus3);",
	],
	'calla': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus1.apply(null, catcus2);",
	],

	'new': genCall(0, true),
	'new1': genCall(1, true),
	'new2': genCall(2, true),
	'new3': genCall(3, true),
	'new4': genCall(4, true),
	'new5': genCall(5, true),
	'new6': genCall(6, true),
	'new7': genCall(7, true),
	'new8': genCall(8, true),
	'new9': genCall(9, true),
	'newn': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus1.length;",
		"var catcus3 = [null];",
		"for (var i = 0; i < catcus2; i++) {",
		"var catcus4 = catcus.pop();",
		"catcus3.push(catcus4);",
		"}",
		"catcus.push(new (Function.prototype.bind.apply(catcus1, catcus3)));",
	],
	'newa': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = [null].concat(catcus2);",
		"catcus.push(new (Function.prototype.bind.apply(catcus1, catcus3)));",
	],

	'instanceof': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"catcus.push(catcus2 instanceof catcus1);",
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
		"catcus.push(catcus2[catcus1]);",
	],

	'set': [
		"var catcus1 = catcus.pop();",
		"var catcus2 = catcus.pop();",
		"var catcus3 = catcus.pop();",
		"catcus3[catcus2] = catcus1;",
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
