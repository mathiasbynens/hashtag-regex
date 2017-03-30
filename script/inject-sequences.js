const fs = require('fs');

const regenerate = require('regenerate');
const sequences = require('unicode-tr51/sequences.js');

const package = require('../package.json');
const dependencies = Object.keys(package.devDependencies);
const version = dependencies.find((name) =>/^unicode-\d/.test(name));

const XID_Continue = require(`${ version }/Binary_Property/XID_Continue/code-points.js`);
const Emoji = require('unicode-tr51/Emoji.js');

const emojiSequenceSymbols = regenerate();
for (const sequence of sequences) {
	emojiSequenceSymbols.add([...sequence]);
}

const Start = regenerate('#', '\uFF03');
const Continue = regenerate('_')
	.add(XID_Continue)
	.add(Emoji)
	.add(emojiSequenceSymbols)
	.remove(Start);

const file = 'index.js';
const input = fs.readFileSync(file, 'utf8');
const output = input
	.replace('<% Start %>', Start.toString())
	.replace('<% Continue %>', Continue.toString());
fs.writeFileSync(file, output);
