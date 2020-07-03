const imageRepo = require("./imageRepo");
const { resizeImageSchema } = require("../../schema/files/image");
const validator = require("../../schema/validator");

/**
 * @function resizeImage
 * @param {Request} req
 * @param {Response} res
 * @returns API response
 */
const resizeImage = async (req, res) => {
	try {
		const imageUrl = req.body;
		const valid = validator.validate(resizeImageSchema, imageUrl);
		if (valid.status) {
			const imageResponse = await imageRepo.resizeImage(imageUrl.url);
			res.set({ "Content-Type": "image/png" });
			return res.status(200).send(imageResponse);
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

module.exports = { resizeImage };
