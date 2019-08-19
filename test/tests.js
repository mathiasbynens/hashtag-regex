const assert = require('assert');
const hashtagRegex = require('../index.js');

const hashtagStartRegex = /[#\uFF03]/;

describe('Hashtag identifier regex', () => {

	const test = (string) => {
		it(`matches #${ string } as a single unit`, () => {
			assert(hashtagRegex().test(string));
			assert.deepEqual(string.match(hashtagRegex())[0], string);
		});
		string = `\uFF03${ string }`;
		it(`matches ${ string } as a single unit`, () => {
			assert(hashtagRegex().test(string));
			assert.deepEqual(string.match(hashtagRegex())[0], string);
		});
	};

	test('abc');
	test('a_b_c');
	test('a-b-c');
	test('a+b+c');
	test('\u{2F9DC}'); // XID_Continue

	const Emoji = require('unicode-tr51/Emoji.js');
	for (const codePoint of Emoji) {
		const string = String.fromCodePoint(codePoint);
		if (hashtagStartRegex.test(string)) {
			continue;
		}
		test(string);
	}

	const sequences = require('unicode-tr51/sequences.js');
	for (const sequence of sequences) {
		if (hashtagStartRegex.test(sequence)) {
			continue;
		}
		test(sequence);
	}

});
