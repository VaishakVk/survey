const jwt = require("jsonwebtoken");

const sign = (payload) => {
	try {
		return jwt.sign(payload, process.env.JWT_KEY);
	} catch (err) {
		throw err;
	}
};

const decode = (token) => {
	try {
		return jwt.decode(token, process.env.JWT_KEY);
	} catch (err) {
		throw err;
	}
};

const hasToken = (req) => {
	try {
		const token = req.headers["authorization"];
		if (!token) throw { status: 401, message: "Token is missing" };
		return decode(token);
	} catch (err) {
		throw err;
	}
};

module.exports = {
	sign,
	decode,
	hasToken,
};
