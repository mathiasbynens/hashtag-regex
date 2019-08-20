const fs = require('fs');

const regenerate = require('regenerate');
const sequences = require('unicode-tr51/sequences.js');

const package = require('../package.json');
const dependencies = Object.keys(package.devDependencies);
const version = dependencies.find((name) =>/^unicode-\d/.test(name));

const XID_Continue = require(`${ version }/Binary_Property/XID_Continue/code-points.js`);
const Emoji = require(`${ version }/Binary_Property/Emoji/code-points.js`);
const Emoji_Component = require(`${ version }/Binary_Property/Emoji_Component/code-points.js`);

// https://unicode.org/reports/tr31/#R8
const Start = regenerate('#', '\uFE5F', '\uFF03');
const Continue = regenerate('_', '-', '+')
	.add(XID_Continue)
	.add(Emoji)
	.add(Emoji_Component)
	.remove(Start);

const file = 'index.js';
const input = fs.readFileSync(file, 'utf8');
const output = input
	.replace('<% Start %>', Start.toString())
	.replace('<% Continue %>', Continue.toString());
fs.writeFileSync(file, output);
