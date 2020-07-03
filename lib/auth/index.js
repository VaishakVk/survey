const authRepo = require("./authRepo");
const { loginSchema } = require("../../schema/files/auth");
const validator = require("../../schema/validator");

/**
 * @function loginUser
 * @param {Request} req
 * @param {Response} res
 * @returns API response
 */
const loginUser = async (req, res) => {
	try {
		const loginFields = req.body;
		const valid = validator.validate(loginSchema, loginFields);
		if (valid.status) {
			const loginResponse = await authRepo.login(
				loginFields.username,
				loginFields.password
			);
			return res.status(200).send({
				status: true,
				response: loginResponse,
			});
		} else {
			return res
				.status(400)
				.send({ status: false, response: valid.message });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};

module.exports = {
	loginUser,
};
