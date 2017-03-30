module.exports = () => {
	return /<% Start %>(?:<% Continue %>)+/gu;
	// Without emoji sequence symbol support:
	// return /[#\uFF03][\p{XID_Continue}_\p{Emoji}]+/gu;
};
