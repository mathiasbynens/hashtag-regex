# hashtag-regex [![Build status](https://travis-ci.org/mathiasbynens/hashtag-regex.svg?branch=master)](https://travis-ci.org/mathiasbynens/hashtag-regex)

_hashtag-regex_ offers a regular expression to match hashtag identifiers [as per the Unicode Standard](http://unicode.org/reports/tr31/#hashtag_identifiers).

This repository contains a script that generates this regular expression based on the Unicode data. Because of this, the regular expression can easily be updated whenever the Unicode Standard changes.

## Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install hashtag-regex
```

In [Node.js](https://nodejs.org/):

```js
const hashtagRegex = require('hashtag-regex');
// Note: because the regular expression has the global flag set, this module
// exports a function that returns the regex rather than exporting the regular
// expression itself, to make it impossible to (accidentally) mutate the
// original regular expression.

const text = `
#hashtag
#©
＃🤷🏿‍♀️ (\uFF03\u{1F937}\u{1F3FF}\u200D\u2640\uFE0F)
`;

const regex = hashtagRegex();
let match;
while (match = regex.exec(text)) {
  const hashtag = match[0];
  console.log(`Matched sequence ${ hashtag } — code points: ${ [...hashtag].length }`);
}
```

Console output:

```
Matched sequence #hashtag — code points: 8
Matched sequence #© — code points: 2
Matched sequence ＃🤷🏿‍♀️ — code points: 6
Matched sequence ＃🤷🏿‍♀️ — code points: 6
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

_hashtag-regex_ is available under the [MIT](https://mths.be/mit) license.
