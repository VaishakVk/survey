const sharp = require("sharp");
const request = require("request").defaults({ encoding: null });

const resizeImage = (imageUrl) => {
	try {
		return new Promise((resolve, reject) => {
			request.get(imageUrl, function (err, res, buffer) {
				if (err) {
					console.log(err);
					reject(err);
				}
				sharp(buffer)
					.resize(50, 50)
					.toBuffer()
					.then((resBuffer) => {
						resolve(resBuffer);
					})
					.catch((err) => {
						reject(err);
					});
			});
		});
	} catch (err) {
		throw err;
	}
};

module.exports = { resizeImage };
