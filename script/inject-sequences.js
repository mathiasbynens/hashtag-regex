const fs = require('fs');

const regenerate = require('regenerate');

const package = require('../package.json');
const dependencies = Object.keys(package.devDependencies);
const version = dependencies.find((name) => name.startsWith('@unicode/unicode-'));

const XID_Continue = require(`${ version }/Binary_Property/XID_Continue/code-points.js`);
const Extended_Pictographic = require(`${ version }/Binary_Property/Extended_Pictographic/code-points.js`);
const Emoji_Component = require(`${ version }/Binary_Property/Emoji_Component/code-points.js`);

// https://unicode.org/reports/tr31/#R8
const Start = regenerate('#', '\uFE5F', '\uFF03');
const Continue = regenerate('_', '-', '+')
	.add(XID_Continue)
	.add(Extended_Pictographic)
	.add(Emoji_Component)
	.remove(Start);

const file = 'index.js';
const input = fs.readFileSync(file, 'utf8');
const output = input
	.replace('<% Start %>', Start.toString())
	.replace('<% Continue %>', Continue.toString());
fs.writeFileSync(file, output);
