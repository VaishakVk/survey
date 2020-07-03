const hasToken = require("../helpers/jwt").hasToken;
module.exports = async (req, res, next) => {
	try {
		const payload = hasToken(req);
		if (!payload) next({ status: 401, message: "Invalid token" });
		req.user = payload.username;
		next();
	} catch (err) {
		console.log(err);
		return next(err);
	}
};
