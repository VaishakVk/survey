const jwt = require("../../helpers/jwt");

/**
 * @function login
 * @param {string} username
 * @description Signs a JWT and returns the token
 * @returns token
 */
const login = (username) => {
	try {
		const payload = {
			username,
		};
		const token = jwt.sign(payload);
		return token;
	} catch (err) {
		throw err;
	}
};

module.exports = {
	login,
};
