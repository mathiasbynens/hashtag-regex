const assert = require('assert');
const hashtagRegex = require('../index.js');

const hashtagStartRegex = /[#\uFE5F\uFF03]/;

describe('Hashtag identifier regex', () => {

	const test = (string) => {
		const a = `#${ string }`;
		it(`matches ${ a } as a single unit`, () => {
			assert(hashtagRegex().test(a));
			assert.deepEqual(a.match(hashtagRegex())[0], a);
		});
		const b = `\uFE5F${ string }`;
		it(`matches ${ b } as a single unit`, () => {
			assert(hashtagRegex().test(b));
			assert.deepEqual(b.match(hashtagRegex())[0], b);
		});
		const c = `\uFF03${ string }`;
		it(`matches ${ c } as a single unit`, () => {
			assert(hashtagRegex().test(c));
			assert.deepEqual(c.match(hashtagRegex())[0], c);
		});
	};

	test('abc');
	test('a_b_c');
	test('a-b-c');
	test('a+b+c');
	test('\u{2F9DC}'); // XID_Continue
	test('\u{1F3F3}\uFE0F\u200D\u26A7\uFE0F'); // 🏳️‍⚧️ Transgender flag
	test('\u{1F3F3}\uFE0F\u200D\u{1F308}'); // 🏳️🏳️‍🌈 Rainbow flag

	const package = require('../package.json');
	const dependencies = Object.keys(package.devDependencies);
	const version = dependencies.find((name) => name.startsWith('@unicode/unicode-'));

	const Emoji = require(`${ version }/Binary_Property/Emoji/code-points.js`);
	const Emoji_Component = require(`${ version }/Binary_Property/Emoji_Component/code-points.js`);
	for (const codePoint of [...Emoji, ...Emoji_Component]) {
		const string = String.fromCodePoint(codePoint);
		if (hashtagStartRegex.test(string)) {
			continue;
		}
		test(string);
	}

	const sequenceProperties = [
		'Basic_Emoji',
		'Emoji_Keycap_Sequence',
		'Emoji_Test',
		'RGI_Emoji',
	];
	const sequences = [];
	for (const prop of sequenceProperties) {
		const tmp = require(`${ version }/Sequence_Property/${ prop }/index.js`);
		sequences.concat(...tmp);
	}

	for (const sequence of sequences) {
		if (hashtagStartRegex.test(sequence)) {
			continue;
		}
		test(sequence);
	}

});
